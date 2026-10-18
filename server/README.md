# Backend

**English** · [Español](README.es.md)

Fastify + Postgres. Two endpoints:

- `POST /classify` `{ image: base64, mediaType: "image/jpeg" | "image/png" | "image/webp", lang: "es" | "en" | "de" }` → `{ parts: [{ category, label, confidence }], alternatives? }`. The photo is not stored.
- `POST /feedback` `{ city, predicted, confidence?, verdict: "yes" | "no" | "other", corrected? }` → 204. Anonymous: no photo, no user id.

Categories and demo results come from the app (`app/src/data/categories.ts`, `app/src/api/demo.ts`), so both sides always agree.

## Run locally

```bash
docker compose up -d   # Postgres on port 5433
cp .env.example .env   # once
npm install
npm run dev
```

Without `ANTHROPIC_API_KEY` the server runs in **test mode** and returns the demo results in turn, at no cost. Put a key in `.env` to classify with Claude; `CLAUDE_MODEL` picks the model.

In the app, set `EXPO_PUBLIC_API_URL` in `app/.env`: `http://10.0.2.2:3000` on the Android emulator, `http://<your PC LAN IP>:3000` on a phone on the same Wi-Fi.

## Check

```bash
npm test
npm run typecheck
```

## Before deploying

No auth and no rate limit yet: anyone who can reach `/classify` spends API credit.
