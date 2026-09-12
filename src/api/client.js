import axios from 'axios';

/**
 * Central Axios instance for Spec2IS Backend API.
 * Uses VITE_API_BASE_URL from .env or falls back to Railway backend URL.
 */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://spec2is-backend-production-5f04.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90s for multi-step LLM extraction and vector search
});

/**
 * POST /analyze
 * @param {string} specificationText - The raw specification text to analyze.
 * @returns {Promise<Object>} The analysis result.
 */
export async function analyzeSpecification(specificationText) {
  const response = await client.post('/analyze', {
    specification_text: specificationText,
  });
  return response.data;
}

export default client;

