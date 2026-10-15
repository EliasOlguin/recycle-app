import Anthropic from '@anthropic-ai/sdk';

import { buildApp } from './app';
import { claudeClassifier, demoClassifier } from './classify';
import { connect } from './db';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set. Copy .env.example to .env.');

const MODEL = process.env.CLAUDE_MODEL ?? 'claude-opus-5-5';
const useClaude = Boolean(process.env.ANTHROPIC_API_KEY);

const db = await connect(DATABASE_URL);
const app = buildApp({ db, classify: useClaude ? claudeClassifier(new Anthropic(), MODEL) : demoClassifier() });

// shortcut: no auth or rate limit; anyone who can reach the server spends API credit. Add both before deploying.
await app.listen({ host: '0.0.0.0', port: Number(process.env.PORT ?? 3000) });
app.log.info(useClaude ? `Classifying with ${MODEL}` : 'No ANTHROPIC_API_KEY: test mode, returning demo results');
