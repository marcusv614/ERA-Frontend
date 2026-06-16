# ERA Frontend

Frontend React para consumir a API ERA de controle de estoque.

## Rodando

```bash
npm install
npm run dev
```

URL local:

```text
http://localhost:5173
```

## Variaveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme a API:

```env
VITE_API_URL=
VITE_AUTH_MODE=api
```

- `VITE_API_URL`: URL base da API. Em desenvolvimento pode ficar vazio, porque o Vite redireciona `/api` para `http://localhost:8080`.
- `VITE_AUTH_MODE`: use `api` para validar usuarios cadastrados em `/api/usuarios` ou `demo` para desenvolvimento local.

## Endpoints consumidos

- `GET /api/usuarios`
- `GET /api/produtos`
- `POST /api/produtos`
- `DELETE /api/produtos/{id}`
- `GET /api/localizacoes`
- `POST /api/localizacoes`
- `GET /api/entradas`
- `POST /api/entradas`
- `GET /api/retiradas`
- `POST /api/retiradas`
- `GET /api/devolucoes`
- `GET /api/movimentacoes`
- `GET /api/estoque/produto/{produtoId}`

## Autenticacao

Como a API atual ainda nao possui endpoint especifico de login, o frontend faz uma autenticacao basica consultando `/api/usuarios` e comparando:

- `email`
- `senhaHash`
- `ativo`

Isso funciona para desenvolvimento, mas o ideal em producao e criar um endpoint dedicado de login no backend.
