# How do I recycle this?

**English** · [Español](README.es.md)

Take a photo of what you are about to throw away, and the app tells you which bin it goes in, using the rules of your city in Germany. Built for people who just moved to Germany and do not know the sorting system yet.

> Working name. Early stage: the main flow works; see [Status](#status).

## How it works

1. You take a photo (or type the item).
2. The backend asks an AI model to name the item, choosing only from a fixed list of categories.
3. The app looks up the rule for that category in your city and shows the bin: the whole screen turns the bin's colour, with its German name and a translation.

The AI only classifies; the bin always comes from rules written from each city's official guide. If a rule is missing, the app says so instead of guessing. More in [docs/answer-logic.md](docs/answer-logic.md).

- **Cities:** Köln, Düsseldorf, Berlin
- **Languages:** Spanish, English, German
- **Platforms:** iOS and Android

## Repository

| Folder | What it is |
|---|---|
| [`app/`](app/) | Mobile app: Expo (React Native + TypeScript) |
| [`server/`](server/) | Backend: Node (Fastify + TypeScript) and Postgres |
| [`docs/`](docs/) | Answer logic, categories, per-city rules with their sources, screen brief |
| [`PRODUCT.md`](PRODUCT.md) | Product context: users, purpose, principles |
| [`DESIGN.md`](DESIGN.md) | Design system: colours, type, components |

## Run it locally

You need Node 20+ and, for the backend, Docker.

**Backend** (see [server/README.md](server/README.md)):

```bash
cd server
docker compose up -d
cp .env.example .env
npm install
npm run dev
```

**App:**

```bash
cd app
cp .env.example .env
npm install
npx expo start
```

Open it with **Expo Go** on your phone (scan the QR code) or on an Android emulator. In `app/.env`, `EXPO_PUBLIC_API_URL` points to the backend: `http://10.0.2.2:3000` on the emulator, `http://<your PC's LAN IP>:3000` on a phone on the same Wi-Fi. Without it, the app runs alone with demo results.

## Status

- Main flow done: first run, camera, result (including uncertain cases), search, history, settings.
- Backend done: photo classification and anonymous feedback. Without an Anthropic API key it runs in test mode and returns demo results.
- Rules: only those verified against official sources. Some categories still have no rule per city; see [docs/city-rules.md](docs/city-rules.md).
- Tested on Android. **iOS has not been tested.**
- Not done yet: login (the app works as a guest), offline use, auth and rate limiting on the backend (needed before deploying).

## Checks

```bash
cd app && npx tsc --noEmit && npx tsx src/logic/decide.test.ts
cd server && npm test && npm run typecheck
```
