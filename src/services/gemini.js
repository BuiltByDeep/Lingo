// TEMPORARY: Hardcoded for testing - REMOVE AFTER TESTING
const GEMINI_API_KEY = 'AIzaSyD86t70Vd-NZDsnE4qtLjt32zJ609hinlk';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

console.log('🔑 Gemini API Key loaded:', GEMINI_API_KEY ? 'Yes ✓' : 'No ✗');
console.log('🔑 First 10 chars:', GEMINI_API_KEY?.substring(0, 10));

export async function sendMessageToAI(messages, userLanguage = 'Spanish') {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here' || GEMINI_API_KEY === 'demo-key') {
    console.log('❌ No valid API key, using mock response');
    return generateMockResponse(messages[messages.length - 1].content);
  }
  
  console.log('✅ Using real Gemini API');

  try {
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

    // Call Gemini REST API with API key in header
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Gemini error:', res.status, err);
      throw new Error(`Gemini failed: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I couldn\'t generate a response.';
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    return generateMockResponse(messages[messages.length - 1].content);
  }
}

// Translation function
export async function translateText(text, fromLang, toLang) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here' || GEMINI_API_KEY === 'demo-key') {
    return `[Translation: ${text}]`;
  }

  try {
    const prompt = `Translate the following text from ${fromLang} to ${toLang}. Only provide the translation, nothing else:\n\n${text}`;

    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Translation error:', res.status, err);
      throw new Error(`Translation failed: ${res.status}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? `[Translation: ${text}]`;
    
  } catch (error) {
    console.error('Translation Error:', error);
    return `[Translation error: ${text}]`;
  }
}

function generateMockResponse(input) {
  const lower = input.toLowerCase();
  
  if (lower.includes('como estas') || lower.includes('cómo estás')) {
    return 'Great attempt! ✨\n\nCorrected: ¿Cómo estás?\n\nThe accent marks are important:\n- "Cómo" (with accent) = how\n- "como" (without) = I eat\n- "estás" shows present tense\n\nExample: ¿Cómo estás hoy? (How are you today?)';
  }
  
  if (lower.includes('translate')) {
    return 'I\'d be happy to help with translation! Just tell me the phrase and which language you want it in. 🌐';
  }
  
  if (lower.includes('hola')) {
    return '¡Hola! Perfect greeting! 👋\n\n"Hola" (OH-lah) is the most common Spanish greeting. You can use it anytime, anywhere!\n\nTry these variations:\n- ¡Buenos días! (Good morning)\n- ¡Buenas tardes! (Good afternoon)\n- ¡Buenas noches! (Good evening)';
  }
  
  if (lower.includes('gracias')) {
    return '¡De nada! (You\'re welcome!) 😊\n\n"Gracias" (GRAH-see-ahs) means "thank you"\n\nOther ways to say thanks:\n- Muchas gracias (Thank you very much)\n- Mil gracias (A thousand thanks)\n\nTo respond: "De nada" or "No hay de qué"';
  }
  
  if (lower.includes('pronunciation') || lower.includes('pronounce')) {
    return 'I can help with pronunciation! 🗣️\n\nJust tell me which word or phrase you want to practice, and I\'ll break it down phonetically with tips on how to say it correctly.';
  }
  
  if (lower.includes('practice') || lower.includes('ideas')) {
    return 'Here are some practice ideas! 💡\n\n1. Describe your day in Spanish\n2. Order food at an imaginary restaurant\n3. Introduce yourself to a new friend\n4. Talk about your hobbies\n\nPick one and try writing a few sentences!';
  }
  
  return 'That\'s a great question! I\'m here to help you learn. Could you be more specific about what you\'d like to practice? Grammar, vocabulary, or conversation? 💡';
}
