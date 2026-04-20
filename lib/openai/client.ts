import OpenAI from 'openai';

// Support GitHub Models API (OpenAI-compatible)
export const openai = new OpenAI({
  apiKey: process.env.GITHUB_TOKEN || process.env.OPENAI_API_KEY || 'placeholder-key',
  baseURL: process.env.GITHUB_TOKEN
    ? 'https://models.inference.ai.azure.com'
    : undefined,
});

export function isOpenAIConfigured(): boolean {
  return (
    (process.env.GITHUB_TOKEN !== undefined && process.env.GITHUB_TOKEN !== 'your_github_token') ||
    (process.env.OPENAI_API_KEY !== undefined && process.env.OPENAI_API_KEY !== 'your_openai_api_key')
  );
}

export function getModelName(): string {
  // Use gpt-4o for GitHub Models, or specified model for OpenAI
  return process.env.AI_MODEL || 'gpt-4o';
}
