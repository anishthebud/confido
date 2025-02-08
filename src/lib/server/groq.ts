import { GROQ_KEY } from '$env/static/private';
import Groq from 'groq-sdk';

export const groq = new Groq({ apiKey: GROQ_KEY });
