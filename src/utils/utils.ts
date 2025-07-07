import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const dateTimeFormatter = (
  value: string | Date,
  format = "DD/MM/YYYY HH:mm",
) => {
  const date = dayjs(value);

  if (!date.isValid()) {
    return "-";
  }

  // Verifica se a string contém hora, caso contrário, só formata como data
  if (format.includes("HH:mm")) {
    return date.format("DD/MM/YYYY HH:mm"); // Data e Hora
  } else {
    return date.format("DD/MM/YYYY"); // Apenas Data
  }
};

/**
 * Função para validar apenas caracteres numéricos em uma input
 * @param {event} - Recebe um evento para validar os caracteres que recebe
 * @returns {string} - Retorna o valor validado
 */
export const validarEntradaNumerica = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const regex = /^[0-9]*$/; // Permite apenas números
  const valor = event.target.value;

  if (!regex.test(valor)) {
    event.target.value = valor.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
  }
};

/**
 * Remove caracteres não numéricos de uma string.
 * @param {string} value - Valor com máscara.
 * @returns {string} - Valor sem máscara.
 */
export const removeMask = (value: string) => {
  return value.replace(/\D+/g, "");
};

/**
 * Adiciona zeros à esquerda para formatar códigos numéricos
 * @param {number} value - Valor natural
 * @param {number} tamanho - Nº de dígitos desejados no código
 * @returns {string} - Valor formatado
 */
export const formatarCodigo = (value: number, tamanho: number) => {
  let codigo = value.toString();
  while (codigo.length < tamanho) {
    codigo = "0" + codigo;
  }
  return codigo;
};

/**
 * Pega dados do localStorage através da chave
 * @param {string} key - chave do item armazenado
 * @returns {any} - valor armazenado
 */
export const getLocalStorageItem = (key: string) => {
  if (typeof window === "undefined") {
    // O código está rodando no servidor (SSR)
    return null;
  }

  // O código está rodando no navegador (client-side)
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

/**
 * Limpa dados do localStorage através das chaves
 * @param {string} keys - chave do item armazenado
 * @returns {boolean} - resultado da operação
 */
export const clearLocalStorageItems = (...keys: string[]) => {
  keys.forEach((key) => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Formata string para CNPJ
 * @param {string} cnpj - string a ser formatada
 * @returns {string}
 */
export const formatarCNPJ = (cnpj: string) => {
  return cnpj
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

/**
 * Formata string para telefone
 * @param {string} telefone - strng a ser formatada
 * @returns {string}
 */
export const formatarTelefone = (telefone: string) => {
  const apenasNumeros = telefone.replace(/\D/g, "");

  if (apenasNumeros.length === 10) {
    // Formato (XX) XXXX-XXXX para telefones com 8 dígitos
    return apenasNumeros.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else if (apenasNumeros.length === 11) {
    // Formato (XX) 9XXXX-XXXX para telefones com 9 dígitos
    return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else {
    // Retorna o telefone sem formatação se não tiver o tamanho esperado
    return telefone;
  }
};

/**
 * Calcula porcentagem de uma parte sobre o todo
 * @param {string | number} valorDoTodo - valor que representa 100%
 * @param {string | number} valorDaParte - valor que representa uma parte do 100%
 * @returns {string}
 */
export const calcularPorcentagem = (
  valorDoTodo: string | number,
  valorDaParte: string | number,
) => {
  console.log("VALOR TOTAL: ", valorDoTodo);
  console.log("VALOR DA PARTE: ", valorDaParte);
  const todo = Number(valorDoTodo);
  const parte = Number(valorDaParte);
  const porcentagem = (parte / todo) * 100;
  console.log("PORCENTAGEM: ", porcentagem);
  // if (porcentagem > 100) return 100;
  return Number(porcentagem.toFixed(2));
};
