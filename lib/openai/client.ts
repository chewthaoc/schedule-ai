import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'placeholder-key',
});

export function isOpenAIConfigured(): boolean {
  return (
    process.env.OPENAI_API_KEY !== undefined &&
    process.env.OPENAI_API_KEY !== 'your_openai_api_key'
  );
}
