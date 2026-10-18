# Backend

[English](README.md) · **Español**

Fastify + Postgres. Dos endpoints:

- `POST /classify` `{ image: base64, mediaType: "image/jpeg" | "image/png" | "image/webp", lang: "es" | "en" | "de" }` → `{ parts: [{ category, label, confidence }], alternatives? }`. La foto no se guarda.
- `POST /feedback` `{ city, predicted, confidence?, verdict: "yes" | "no" | "other", corrected? }` → 204. Anónimo: sin foto y sin id de usuario.

Las categorías y los resultados de ejemplo salen de la app (`app/src/data/categories.ts`, `app/src/api/demo.ts`), así los dos lados siempre coinciden.

## Correrlo en tu computadora

```bash
docker compose up -d   # Postgres en el puerto 5433
cp .env.example .env   # una sola vez
npm install
npm run dev
```

Sin `ANTHROPIC_API_KEY`, el servidor corre en **modo de prueba**: devuelve los resultados de ejemplo uno tras otro, sin costo. Poné una key en `.env` para clasificar con Claude; `CLAUDE_MODEL` elige el modelo.

En la app, configurá `EXPO_PUBLIC_API_URL` en `app/.env`: `http://10.0.2.2:3000` en el emulador de Android, `http://<IP de tu PC en la red>:3000` en un celular conectado al mismo Wi‑Fi.

## Chequeos

```bash
npm test
npm run typecheck
```

## Antes de publicarlo

Todavía no tiene autenticación ni límite de pedidos: cualquiera que llegue a `/classify` gasta crédito de la API.
