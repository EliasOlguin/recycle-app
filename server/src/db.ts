import pg from 'pg';

export type Feedback = {
  city: string;
  predicted: string;
  confidence?: number;
  verdict: 'yes' | 'no' | 'other';
  corrected?: string;
};

export type Db = { saveFeedback: (f: Feedback) => Promise<void>; close: () => Promise<void> };

// No photo and no user id: feedback is anonymous by design (see docs/answer-logic.md).
const SCHEMA = `
CREATE TABLE IF NOT EXISTS feedback (
  id          bigserial PRIMARY KEY,
  created_at  timestamptz NOT NULL DEFAULT now(),
  city        text NOT NULL,
  predicted   text NOT NULL,
  confidence  real,
  verdict     text NOT NULL CHECK (verdict IN ('yes', 'no', 'other')),
  corrected   text
);`;

export async function connect(url: string): Promise<Db> {
  const pool = new pg.Pool({ connectionString: url });
  await pool.query(SCHEMA);
  return {
    saveFeedback: async (f) => {
      await pool.query(
        'INSERT INTO feedback (city, predicted, confidence, verdict, corrected) VALUES ($1, $2, $3, $4, $5)',
        [f.city, f.predicted, f.confidence ?? null, f.verdict, f.corrected ?? null],
      );
    },
    close: () => pool.end(),
  };
}
