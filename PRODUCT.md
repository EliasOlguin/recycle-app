# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Stack

- App: Expo (React Native + TypeScript).
- Backend: Node (TypeScript) with Postgres. The backend calls the vision model so the API key never ships in the app.

## Users

People living in Germany who don't know which bin something goes in, not only Germans. The core case is newcomers who have just moved to Germany and haven't learned the local sorting system yet. They are standing at home with an item in their hand, about to throw it away.

## Product Purpose

The user takes a photo of the item they're about to throw away. AI identifies it and tells them where it goes and how to dispose of it, using the rules for the user's city. Success means the user sorts the item correctly in seconds, without having to understand the whole German system first.

Working name: "How do I recycle this?" (not final).

## Positioning

Undecided. No differentiator versus neighboring apps has been confirmed yet; do not invent one.

## Operating Context

- Used at the moment of disposal: at home, at the bins, with the item in hand. Camera-first.
- Waste rules in Germany vary by city and municipality. The app applies city-specific rules, either detected or chosen by the user.
- Users may not know German terms for bins and waste categories (e.g. Gelbe Tonne / Gelber Sack, Biotonne, Papier, Restmüll, Glas, Pfand), so answers must make sense to someone new to the system.

## Capabilities and Constraints

- Photo capture → AI item recognition → disposal instruction (which bin and how).
- City-specific rules. Launch cities: Köln, Düsseldorf, Berlin. Rules come from each city's official waste guide, entered by hand.
- Guest use by default; login is optional.
- Languages: German, English, Spanish.
- Answer logic (how a photo becomes an answer): see [docs/answer-logic.md](docs/answer-logic.md).
- Open: product name, offline behavior, and what an account adds beyond guest use.

## Evidence on Hand

None yet. No real users, testimonials, recognition accuracy figures, or city coverage numbers exist. Future work must not fabricate them.

## Product Principles

1. **Answer at the moment of disposal.** Photo to answer as fast as possible; the user has the item in hand.
2. **Local rules, not national guesses.** An answer is only correct if it reflects the user's city.
3. **Built for newcomers.** Assume no prior knowledge of the German system or vocabulary; explain the German bin names rather than relying on them.
4. **Honest when unsure.** When the AI isn't confident, say so and help the user find the answer instead of presenting a guess as fact.

## Accessibility & Inclusion

Multilingual from the start (German, English, Spanish), for an audience that includes non-native German speakers. No specific accessibility standard confirmed yet.
