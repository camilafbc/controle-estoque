---
name: codigo-barras-produto
description: >-
  Use esta skill ao implementar cadastro de produtos por código de barras,
  consulta de catálogo via API externa, enriquecimento de dados, integração de
  APIs, loading, timeout, cache ou tratamento de falhas.
---

# Busca de produto por código de barras

## Quando usar

- Adicionar consulta de dados de produto durante o cadastro.
- Integrar uma API externa sem expor segredos no navegador.
- Preencher descrição, fabricante ou outros dados mantendo edição manual.

## Procedimento

1. Confirme o formato aceito do código de barras e valide-o antes da requisição.
2. Faça a chamada externa no servidor, por Route Handler, Server Action ou
   serviço dedicado, nunca expondo chaves privadas no Client Component.
3. Tipifique e valide a resposta externa; mapeie-a para um DTO interno estável.
4. Use timeout, tratamento explícito de erro, resposta `404` para não
   encontrado e não persista dados incompletos como se fossem confirmados.
5. No formulário, exponha estados de loading, erro, não encontrado e sucesso;
   permita editar o preenchimento e confirmar antes de salvar.
6. Evite chamadas duplicadas e considere debounce ou cache apenas se isso
   respeitar a política da API.

## Validação

- Teste código inválido, produto encontrado, não encontrado, timeout e erro da
  API sem bloquear o cadastro manual.
- Execute `npm run lint` e `npm run build` após as alterações.
