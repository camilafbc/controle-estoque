import { gtinProductResponseSchema, gtinSchema } from "@/schemas/gtin-schema";

const API_BASE_URL = "https://gtin.rscsistemas.com.br";
const TOKEN_URL = `${API_BASE_URL}/api/v3/oauth/token`;
const REFRESH_URL = `${API_BASE_URL}/api/auth/refresh`;
const PRODUCT_URL = `${API_BASE_URL}/api/v3/gtin`;
const REQUEST_TIMEOUT_MS = 8_000;

interface TokenResponse {
  token: string;
  refresh_token: string;
  expires_in: number;
}

interface TokenCache {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface GtinProduct {
  codigoBarras: string;
  descricao: string;
  fabricante: string;
}

export class GtinServiceError extends Error {
  constructor(
    message: string,
    public readonly status: 400 | 404 | 408 | 429 | 502 | 503,
  ) {
    super(message);
    this.name = "GtinServiceError";
  }
}

let tokenCache: TokenCache | null = null;

function getCredentials() {
  const username = process.env.GTIN_API_USERNAME;
  const password = process.env.GTIN_API_PASSWORD;
  if (!username || !password) {
    throw new GtinServiceError(
      "A integração GTIN não está configurada no servidor.",
      503,
    );
  }
  return { username, password };
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new GtinServiceError(
        "A consulta GTIN demorou demais. Tente novamente.",
        408,
      );
    }
    throw new GtinServiceError("Não foi possível consultar a API GTIN.", 502);
  } finally {
    clearTimeout(timeout);
  }
}

async function parseTokenResponse(response: Response): Promise<TokenResponse> {
  if (!response.ok) {
    throw new GtinServiceError(
      "Não foi possível autenticar na API GTIN.",
      response.status === 429 ? 429 : 502,
    );
  }

  const body: unknown = await response.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("token" in body) ||
    !("refresh_token" in body) ||
    !("expires_in" in body) ||
    typeof body.token !== "string" ||
    typeof body.refresh_token !== "string" ||
    typeof body.expires_in !== "number"
  ) {
    throw new GtinServiceError("Resposta inválida da autenticação GTIN.", 502);
  }
  return {
    token: body.token,
    refresh_token: body.refresh_token,
    expires_in: body.expires_in,
  };
}

async function authenticate(): Promise<TokenCache> {
  const { username, password } = getCredentials();
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");
  const response = await fetchWithTimeout(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      Accept: "application/json",
      "Content-Length": "0",
      "User-Agent": "GestorEstoqueSenac/1.0",
    },
    body: "",
  });
  const token = await parseTokenResponse(response);
  return {
    accessToken: token.token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + token.expires_in * 1000,
  };
}

async function refreshToken(current: TokenCache): Promise<TokenCache> {
  const response = await fetchWithTimeout(REFRESH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refresh_token: current.refreshToken }),
  });
  const token = await parseTokenResponse(response);
  return {
    accessToken: token.token,
    refreshToken: token.refresh_token,
    expiresAt: Date.now() + token.expires_in * 1000,
  };
}

async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.accessToken;
  }

  tokenCache = tokenCache
    ? await refreshToken(tokenCache).catch(() => authenticate())
    : await authenticate();
  return tokenCache.accessToken;
}

export async function getProductByGtin(
  codigoBarras: string,
): Promise<GtinProduct> {
  const validation = gtinSchema.safeParse(codigoBarras);
  if (!validation.success) {
    throw new GtinServiceError("Código de barras inválido.", 400);
  }

  const response = await fetchWithTimeout(
    `${PRODUCT_URL}/${encodeURIComponent(codigoBarras)}`,
    {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        Accept: "application/json",
        "User-Agent": "GestorEstoqueSenac/1.0",
      },
    },
  );

  if (response.status === 404) {
    throw new GtinServiceError("Produto não encontrado na busca.", 404);
  }
  if (response.status === 429) {
    throw new GtinServiceError(
      "A API GTIN atingiu o limite de consultas. Tente novamente mais tarde.",
      429,
    );
  }
  if (!response.ok) {
    throw new GtinServiceError("A API GTIN está indisponível.", 502);
  }

  const body: unknown = await response.json();
  const parsed = gtinProductResponseSchema.safeParse(body);
  if (!parsed.success) {
    throw new GtinServiceError("Resposta inválida da API GTIN.", 502);
  }

  const descricao = parsed.data.nome_acento || parsed.data.nome;
  if (!descricao) {
    throw new GtinServiceError(
      "A API GTIN não retornou uma descrição para este produto.",
      404,
    );
  }

  return {
    codigoBarras: parsed.data.ean,
    descricao,
    fabricante: parsed.data.marca ?? "",
  };
}
