// AI utility — wraps API calls with proper prompts
// Uses Vercel serverless API route for production (keeps key server-side)

const API_BASE = import.meta.env.PROD 
  ? '/api/ai' 
  : '/api/ai';

export async function callAI(systemPrompt, userMessage, onStream = null) {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, userMessage }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} — ${error}`);
    }

    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error('AI call failed:', err);
    throw err;
  }
}

export function extractJSON(rawContent) {
  try {
    // Try standard parsing first
    return JSON.parse(rawContent);
  } catch (e) {
    try {
      // Clean up markdown block formatting
      let cleaned = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e2) {
      // Find the first { or [ and last } or ]
      const startObj = rawContent.indexOf('{');
      const startArr = rawContent.indexOf('[');
      const endObj = rawContent.lastIndexOf('}');
      const endArr = rawContent.lastIndexOf(']');
      
      let start = -1;
      if (startObj !== -1 && startArr !== -1) start = Math.min(startObj, startArr);
      else if (startObj !== -1) start = startObj;
      else if (startArr !== -1) start = startArr;
      
      let end = -1;
      if (endObj !== -1 && endArr !== -1) end = Math.max(endObj, endArr);
      else if (endObj !== -1) end = endObj;
      else if (endArr !== -1) end = endArr;

      if (start !== -1 && end !== -1 && end > start) {
        return JSON.parse(rawContent.substring(start, end + 1));
      }
      throw new Error('Failed to parse JSON');
    }
  }
}
