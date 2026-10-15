import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';

import type { CityId, Lang } from '@/data/types';
import type { Classification } from '@/logic/decide';

import { DEMO, DEMO_KEYS } from './demo';

/** Backend base URL. On a phone or emulator, localhost is the device itself: use the PC's LAN IP. */
const API = process.env.EXPO_PUBLIC_API_URL;

let turn = 0;

export async function classify(photoUri: string, lang: Lang): Promise<Classification> {
  // shortcut: without EXPO_PUBLIC_API_URL the app cycles the demo results locally, so it runs with no server.
  if (!API) return DEMO[DEMO_KEYS[turn++ % DEMO_KEYS.length]];

  // 1024 px is plenty to recognise an item, keeps the upload small and the image under Claude's 5 MB limit.
  const rendered = await ImageManipulator.manipulate(photoUri).resize({ width: 1024 }).renderAsync();
  const { base64 } = await rendered.saveAsync({ base64: true, compress: 0.7, format: SaveFormat.JPEG });

  const res = await fetch(`${API}/classify`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ image: base64, mediaType: 'image/jpeg', lang }),
  });
  if (!res.ok) throw new Error(`classify failed: ${res.status}`);
  return res.json();
}

export type Verdict = 'yes' | 'no' | 'other';

/** Anonymous feedback: no photo, no user id. Best effort, a failure never reaches the user. */
export function sendFeedback(f: { city: CityId; predicted: string; confidence?: number; verdict: Verdict; corrected?: string }) {
  if (!API) return;
  fetch(`${API}/feedback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(f) }).catch(() => {});
}

export const demoClassification = (key: string) => DEMO[key];
