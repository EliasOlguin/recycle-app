import { CATEGORIES } from '../data/categories';
import type { Lang } from '../data/types';

const norm = (s: string) => s.toLocaleLowerCase('de').normalize('NFD').replace(/\p{Diacritic}/gu, '');

export type Hit = { category: string; label: string };

/** Matches the query against category names and Abfall-ABC words in all three languages. */
export function search(query: string, lang: Lang): Hit[] {
  const q = norm(query.trim());
  if (q.length < 2) return [];
  const hits: Hit[] = [];
  for (const c of CATEGORIES) {
    const word = c.words.find((w) => norm(w).includes(q));
    const named = Object.values(c.name).some((n) => norm(n).includes(q));
    if (word || named) hits.push({ category: c.key, label: word && !named ? word : c.name[lang] });
  }
  return hits;
}
