// Netlify Function to proxy Gemini API calls
// This keeps your API key secure on the server side

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Initialize Gemini with server-side API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_SERVER);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Parse request body
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request: messages array required' })
      };
    }

    // Extract system prompt and conversation
    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    // Build full prompt
    let fullPrompt = '';
    if (systemMessage) {
      fullPrompt = `${systemMessage.content}\n\n`;
    }

    fullPrompt += 'Conversation:\n';
    conversationMessages.forEach(msg => {
      fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
    });
    fullPrompt += 'Assistant:';

    // Call Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: text })
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch from Gemini API',
        details: error.message 
      })
    };
  }
}
