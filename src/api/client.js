import axios from 'axios';
import { mockAnalyze } from './mockData';

/**
 * Central Axios instance.
 * Replace the baseURL with the real backend URL when ready.
 */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Whether to use mock data instead of the real backend.
 * Set VITE_USE_MOCK=false in .env to hit the real API.
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/**
 * POST /analyze
 * @param {string} specificationText - The raw specification text to analyze.
 * @returns {Promise<Object>} The analysis result.
 */
export async function analyzeSpecification(specificationText) {
  if (USE_MOCK) {
    return mockAnalyze(specificationText);
  }

  const response = await client.post('/analyze', {
    specification_text: specificationText,
  });
  return response.data;
}

export default client;
