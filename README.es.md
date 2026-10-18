# How do I recycle this?

[English](README.md) · **Español**

Sacás una foto de lo que vas a tirar y la app te dice en qué tacho va, con las reglas de tu ciudad en Alemania. Pensada para quien recién se mudó a Alemania y todavía no conoce el sistema de separación.

> Nombre provisorio. Etapa temprana: el flujo principal funciona; ver [Estado](#estado).

## Cómo funciona

1. Sacás una foto (o escribís el objeto).
2. El backend le pide a un modelo de IA que identifique el objeto, eligiendo solo de una lista fija de categorías.
3. La app busca la regla de esa categoría en tu ciudad y te muestra el tacho: toda la pantalla toma el color del tacho, con su nombre en alemán y la traducción.

La IA solo clasifica; el tacho siempre sale de reglas escritas a partir de la guía oficial de cada ciudad. Si falta una regla, la app lo dice en vez de adivinar. Más detalle en [docs/answer-logic.md](docs/answer-logic.md).

- **Ciudades:** Köln, Düsseldorf, Berlín
- **Idiomas:** español, inglés, alemán
- **Plataformas:** iOS y Android

## Repositorio

| Carpeta | Qué es |
|---|---|
| [`app/`](app/) | App móvil: Expo (React Native + TypeScript) |
| [`server/`](server/) | Backend: Node (Fastify + TypeScript) y Postgres |
| [`docs/`](docs/) | Lógica de respuesta, categorías, reglas por ciudad con sus fuentes, brief de pantallas |
| [`PRODUCT.md`](PRODUCT.md) | Contexto del producto: usuarios, propósito, principios |
| [`DESIGN.md`](DESIGN.md) | Sistema de diseño: colores, tipografía, componentes |

## Correrlo en tu computadora

Necesitás Node 20 o más nuevo y, para el backend, Docker.

**Backend** (ver [server/README.es.md](server/README.es.md)):

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

Abrila con **Expo Go** en tu celular (escaneando el QR) o en un emulador de Android. En `app/.env`, `EXPO_PUBLIC_API_URL` apunta al backend: `http://10.0.2.2:3000` en el emulador, `http://<IP de tu PC en la red>:3000` en un celular conectado al mismo Wi‑Fi. Si no la configurás, la app funciona sola con resultados de ejemplo.

## Estado

- Flujo principal listo: primer uso, cámara, resultado (incluidos los casos de duda), búsqueda, historial y ajustes.
- Backend listo: clasificación de fotos y feedback anónimo. Sin API key de Anthropic corre en modo de prueba y devuelve resultados de ejemplo.
- Reglas: solo las verificadas contra fuentes oficiales. Algunas categorías todavía no tienen regla en todas las ciudades; ver [docs/city-rules.md](docs/city-rules.md).
- Probada en Android. **iOS no se probó.**
- Pendiente: inicio de sesión (la app funciona como invitado), uso sin conexión, autenticación y límite de pedidos en el backend (necesarios antes de publicarlo).

## Chequeos

```bash
cd app && npx tsc --noEmit && npx tsx src/logic/decide.test.ts
cd server && npm test && npm run typecheck
```
