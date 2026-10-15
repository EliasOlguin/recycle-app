import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import type { CityId, Lang } from '@/data/types';
import type { Classification } from '@/logic/decide';
import { STRINGS } from '@/i18n';

export type HistoryPart = { label: string; category: string; destination: string };
export type HistoryEntry = {
  id: string;
  at: string;
  city: CityId;
  parts: HistoryPart[];
  /** What the app said first, kept when the user corrects it. */
  wrong?: HistoryPart[];
};

/** The scan in progress. Kept in memory only; the photo is never stored. */
export type Scan = { id: string; classification: Classification; photoUri?: string };

type Saved = { lang: Lang; city: CityId | null; onboarded: boolean; history: HistoryEntry[] };

const KEY = 'app-state-v1';
const deviceLang = (): Lang => {
  const code = getLocales()[0]?.languageCode;
  return code === 'de' || code === 'en' ? code : code === 'es' ? 'es' : 'en';
};

type Store = Saved & {
  ready: boolean;
  t: (typeof STRINGS)[Lang];
  scan: Scan | null;
  setLang: (l: Lang) => void;
  setCity: (c: CityId) => void;
  finishOnboarding: () => void;
  startScan: (s: Omit<Scan, 'id'> & { id?: string }) => string;
  record: (entry: HistoryEntry) => void;
  correct: (id: string, parts: HistoryPart[]) => void;
  clearHistory: () => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>({ lang: deviceLang(), city: null, onboarded: false, history: [] });
  const [ready, setReady] = useState(false);
  const [scan, setScan] = useState<Scan | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => raw && setSaved((s) => ({ ...s, ...JSON.parse(raw) })))
      .catch(() => {}) // unreadable storage: start fresh rather than block the app
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(saved)).catch(() => {});
  }, [saved, ready]);

  const update = (patch: Partial<Saved> | ((s: Saved) => Partial<Saved>)) =>
    setSaved((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));

  const store: Store = {
    ...saved,
    ready,
    t: STRINGS[saved.lang],
    scan,
    setLang: (lang) => update({ lang }),
    setCity: (city) => update({ city }),
    finishOnboarding: () => update({ onboarded: true }),
    startScan: (s) => {
      const id = s.id ?? `${Date.now()}`;
      setScan({ ...s, id });
      return id;
    },
    record: (entry) => update((s) => ({ history: [entry, ...s.history.filter((h) => h.id !== entry.id)].slice(0, 200) })),
    correct: (id, parts) =>
      update((s) => ({ history: s.history.map((h) => (h.id === id ? { ...h, wrong: h.wrong ?? h.parts, parts } : h)) })),
    clearHistory: () => update({ history: [] }),
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside StoreProvider');
  return s;
}
