import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mic, MicOff, Languages, BookOpen, MessageCircle, Lightbulb, Book } from 'lucide-react';
import { sendMessageToAI } from '../../services/gemini';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useTheme } from '../../contexts/ThemeContext';

// Supported languages with codes, names, and flags
const LANGUAGES = [
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-PT', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' }
];

export default function AIBuddyWindow() {
  const { theme } = useTheme();
  
  // Core state
  const [targetLanguage, setTargetLanguage] = useState(null);
  const [languageName, setLanguageName] = useState(null);
  const [currentMode, setCurrentMode] = useState('learn');
  const [simpleMode, setSimpleMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const messagesEndRef = useRef(null);
  
  // Voice recognition
  const { isListening, transcript, isSupported, startListening, stopListening } = 
    useSpeechRecognition(targetLanguage || 'en-US');

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome message on first load
  useEffect(() => {
    if (!targetLanguage) {
      setMessages([{
        role: 'assistant',
        content: 'Welcome! 👋 Which language would you like to practice today?',
        timestamp: Date.now(),
        isLanguageSelection: true
      }]);
    }
  }, [targetLanguage]);

  // Handle voice input
  useEffect(() => {
    if (transcript) {
      if (currentMode === 'pronunciation') {
        // Auto-evaluate pronunciation
        setInputValue(transcript);
        setTimeout(() => {
          handlePronunciationFeedback(transcript);
        }, 500);
      } else {
        setInputValue(transcript);
      }
    }
  }, [transcript, currentMode]);

  // Generate dynamic system prompt based on language, mode, and simpleMode
  const generateSystemPrompt = (mode) => {
    return `YOU MUST RESPOND IN ${languageName.toUpperCase()} ONLY!

🚨🚨🚨 CRITICAL: TARGET LANGUAGE = ${languageName.toUpperCase()} 🚨🚨🚨

STOP! READ THIS FIRST:
- You are teaching ${languageName.toUpperCase()}
- Language code: ${targetLanguage}
- DO NOT USE SPANISH unless Spanish is the target language
- DO NOT USE ANY OTHER LANGUAGE except ${languageName.toUpperCase()}

LANGUAGE RULES (CANNOT BE VIOLATED):
1. If teaching Korean → Use KOREAN words, NOT Spanish/French/Japanese/etc
2. If teaching French → Use FRENCH words, NOT Spanish/Korean/Japanese/etc  
3. If teaching Japanese → Use JAPANESE words, NOT Spanish/Korean/French/etc
4. If teaching German → Use GERMAN words, NOT Spanish/Korean/French/etc
5. If teaching Italian → Use ITALIAN words, NOT Spanish/Korean/French/etc
6. If teaching Portuguese → Use PORTUGUESE words, NOT Spanish/Korean/French/etc
7. If teaching Chinese → Use CHINESE words, NOT Spanish/Korean/French/etc
8. NEVER default to Spanish - check the target language first!
9. Current target: ${languageName} - USE THIS LANGUAGE ONLY

You are an AI Language Buddy teaching ${languageName} (${targetLanguage}).

Current mode: ${mode}
Target language: ${targetLanguage} (${languageName})
Simple Mode: ${simpleMode ? 'ON' : 'OFF'}

🚨 CRITICAL RULES FOR ALL MODES:

${simpleMode ? `1. 👶 TEACH LIKE A 5-YEAR-OLD (SIMPLE MODE ON):
   - Use ONLY simple, common words (no complex vocabulary)
   - Maximum 5-7 words per sentence in target language
   - Break complex ideas into tiny, easy pieces
   - Use lots of emojis (😊 🎉 ⭐ 👍 🌟)
   - Celebrate EVERY attempt: "Great job!", "You're doing amazing!", "Perfect!"
   - Explain grammar like: "Think of it like..." with simple comparisons

2. 📝 BILINGUAL FORMAT (MANDATORY):
   - EVERY sentence in ${languageName} MUST have 📝 (English translation) immediately after
   - Format: "${languageName} text 📝 (English translation)"
   - IMPORTANT: Use ${languageName} ONLY, not Spanish or other languages
   - Example format: "[${languageName} phrase] 📝 (English translation)"

3. 🎯 KEEP IT SUPER SIMPLE:
   - Target language: 5-7 words maximum per sentence
   - English explanations: Use words a 5-year-old would understand
   - No grammar jargon - explain like: "This word means..." or "We say this when..."

4. 🎉 BE ENCOURAGING:
   - Start responses with: "Great!", "Awesome!", "You're doing so well!"
   - End with: "Keep going!", "You've got this!", "Amazing progress!"
   - Use celebration emojis: 🎉 ⭐ 👏 🌟 💪` : `1. 📚 NORMAL TEACHING MODE (SIMPLE MODE OFF):
   - Use natural, conversational language
   - Sentences can be longer (10-15 words)
   - Provide more detailed explanations
   - Still be encouraging but more mature tone
   - Less emojis, more professional

2. 📝 BILINGUAL FORMAT (MANDATORY):
   - EVERY sentence in ${languageName} MUST have 📝 (English translation) immediately after
   - Format: "${languageName} text 📝 (English translation)"
   - IMPORTANT: Use ${languageName} ONLY, not Spanish or other languages`}

🚨 CRITICAL OUTPUT FORMAT 🚨
NEVER return JSON, code blocks, arrays, or structured data.
ALWAYS reply in plain natural language formatted for chat.
Your output must NEVER contain { }, [ ], JSON keys, or code-like syntax.

Response format:
1. Start with target language content
2. Add 📝 (English translation) after each sentence
3. Keep it conversational and natural
4. End with a follow-up question in target language 📝 (English translation)

MODE-SPECIFIC INSTRUCTIONS:

${mode === 'learn' ? `
═══════════════════════════════════════════════════════════
📚 LEARN MODE (Step-by-Step Lessons)
═══════════════════════════════════════════════════════════

Format your response like this:

**Lesson [number]: [Topic]**

[Brief explanation in English - max 3 lines]

**Examples:**
• [${languageName} phrase] 📝 (English meaning) - Pronunciation: [phonetic]
• [${languageName} phrase] 📝 (English meaning) - Pronunciation: [phonetic]
• [${languageName} phrase] 📝 (English meaning) - Pronunciation: [phonetic]

**Your turn:**
[ONE simple exercise question in English]

Type 'continue' when ready for the next lesson!
` : ''}

${mode === 'chat' ? `
═══════════════════════════════════════════════════════════
💬 CHAT MODE (Conversational Practice)
═══════════════════════════════════════════════════════════

Respond naturally in ${languageName} with English translations:

[${languageName} response] 📝 (English translation)
[${languageName} response] 📝 (English translation)

[${languageName} follow-up question?] 📝 (English translation?)
` : ''}

${mode === 'translate' ? `
═══════════════════════════════════════════════════════════
🔄 TRANSLATE MODE (Translation + Reverse Learning)
═══════════════════════════════════════════════════════════

MUST return 4 things:
1. Direct translation in ${languageName}
2. Simplified version (Beginner-friendly) in ${languageName}
3. Advanced version (B2+ level) in ${languageName}
4. Grammar spotlight (Explain one word or rule)
5. Pronunciation guidance
` : ''}

${mode === 'grammar' ? `
═══════════════════════════════════════════════════════════
✏️ GRAMMAR MODE
═══════════════════════════════════════════════════════════

Structure (4 parts):
1. Show the corrected sentence in ${languageName}
2. Explain the rule in 1-2 sentences
3. Give ONE additional example in ${languageName}
4. Ask user to try writing another sentence
` : ''}

${mode === 'pronunciation' ? `
═══════════════════════════════════════════════════════════
🗣️ PRONUNCIATION MODE
═══════════════════════════════════════════════════════════

For text:
- Provide IPA notation
- Describe tongue/mouth placement
- Give slow phonetic breakdown in ${languageName}

For voice (audio):
- Provide score from 1-10
- Highlight mispronounced parts
- Show corrected pronunciation
- Provide repeat-after-me sentence in ${languageName}
` : ''}

${mode === 'practice' ? `
═══════════════════════════════════════════════════════════
🎭 PRACTICE MODE (Scenario Practice)
═══════════════════════════════════════════════════════════

Available scenarios:
• Restaurant • Airport • Shopping • Doctor • Work

Rules:
- AI plays the role in the scenario
- Keep conversation realistic in ${languageName}
- Ask ONE question at a time
- Give corrections only when asked or when user makes big mistake
- End each turn with natural next question
- Every line must have 📝 (English translation)
` : ''}

${mode === 'vocab' ? `
═══════════════════════════════════════════════════════════
📖 VOCABULARY BUILDER MODE
═══════════════════════════════════════════════════════════

Track:
- New words user learns
- Mistakes they repeat
- Words they struggle with

Each vocab entry must include:
• Word in ${languageName}
• English translation
• Example sentence with translation in ${languageName}
• Pronunciation guide
• Optional mini-quiz

When user has 10+ words → offer quiz:
"Would you like a 10-word review quiz?"
` : ''}

⚠️ GENERAL RULES (APPLY TO ALL MODES):

Rule 1: NEVER MIX MODES
- If user is in "${mode}" mode, stay in ${mode} mode until they switch
- Don't jump to other modes unless asked

Rule 2: ONE QUESTION AT A TIME
- Never give multiple tasks
- Wait for user input before proceeding

Rule 3: KEEP PARAGRAPHS SHORT
- Maximum 4 lines per paragraph
- Use bullet points for lists

Rule 4: NO OVERWHELMING
- Small chunks only
- Always wait for user input
- Don't dump information

Rule 5: BE FRIENDLY & SUPPORTIVE
- Tone like a fun tutor, not a textbook
- Celebrate small wins
- Encourage mistakes as learning opportunities

🚨🚨🚨 FINAL CRITICAL REMINDER 🚨🚨🚨
YOU ARE TEACHING ${languageName.toUpperCase()} (${targetLanguage})!
- ALL target language content MUST be in ${languageName}
- Do NOT use Spanish, French, Korean, Japanese, German, Italian, Portuguese, or Chinese UNLESS that is the target language
- If teaching Korean, use Korean. If teaching French, use French. If teaching Japanese, use Japanese.
- NEVER mix languages or default to Spanish
- Check every single phrase before responding - is it in ${languageName}?`;
  };

  // Handle pronunciation feedback
  const handlePronunciationFeedback = async (spokenText) => {
    if (!spokenText || !targetLanguage) return;

    const userMessage = {
      role: 'user',
      content: `🎤 "${spokenText}"`,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are evaluating pronunciation for a BEGINNER learning ${languageName} (${targetLanguage}).

🚨 CRITICAL: The user is learning ${languageName.toUpperCase()}, not Spanish or any other language!

The user just spoke: "${spokenText}"

Respond with valid JSON:
{
  "reply": "Encouraging feedback message with score",
  "mode": "voice_feedback",
  "voiceFeedback": {
    "score": 7,
    "comment": "Brief overall feedback (max 2 sentences)",
    "mispronouncedWords": [
      {"word": "word", "ipa": "pronunciation hint", "tip": "concrete advice"}
    ]
  },
  "sections": [
    {"type": "pronunciation", "label": "What you said", "content": "${spokenText}"},
    {"type": "tip", "label": "Pronunciation tip", "content": "specific advice"}
  ],
  "followUpQuestion": "Want to try another word?"
}

Be VERY encouraging. Focus on 1-2 specific improvements. Give a score from 1-10.`;

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Evaluate my pronunciation: "${spokenText}"` }
      ];

      const aiContent = await sendMessageToAI(apiMessages);
      
      let parsedResponse;
      try {
        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
        parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch (e) {
        parsedResponse = null;
      }

      const aiResponse = {
        role: 'assistant',
        content: parsedResponse?.reply || aiContent,
        timestamp: Date.now(),
        structured: parsedResponse,
        mode: 'voice_feedback'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorResponse = {
        role: 'assistant',
        content: 'Sorry, I couldn\'t evaluate that. Please try again! 🙏',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Main message sending function
  const handleSend = async () => {
    if (!inputValue.trim() || !targetLanguage) return;

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Generate dynamic system prompt based on current language and mode
      const systemPrompt = generateSystemPrompt(currentMode);

      // Add language reminder to user message
      const userMessageWithReminder = `[REMINDER: Respond in ${languageName.toUpperCase()} only, NOT Spanish]\n\n${inputValue}`;

      // Convert to API format
      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...newMessages.filter(m => !m.isLanguageSelection).slice(0, -1).map(({ role, content }) => ({ role, content })),
        { role: 'user', content: userMessageWithReminder }
      ];

      const aiContent = await sendMessageToAI(apiMessages);

      const aiResponse = {
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now(),
        mode: currentMode
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorResponse = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again! 🙏',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render message content
  const renderMessage = (msg) => {
    return <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'normal' }}>{msg.content}</div>;
  };

  // Handle language selection
  const handleLanguageSelect = (lang) => {
    setTargetLanguage(lang.code);
    setLanguageName(lang.name);
    
    // Bilingual greetings for each language
    const greetings = {
      'es-ES': '¡Hola! 📝 (Hello!) Vamos a practicar español juntos. 📝 (Let\'s practice Spanish together.)',
      'fr-FR': 'Bonjour! 📝 (Hello!) Pratiquons le français ensemble. 📝 (Let\'s practice French together.)',
      'ja-JP': 'こんにちは！📝 (Hello!) 一緒に日本語を練習しましょう。📝 (Let\'s practice Japanese together.)',
      'ko-KR': '안녕하세요! 📝 (Hello!) 함께 한국어를 연습해요. 📝 (Let\'s practice Korean together.)',
      'de-DE': 'Hallo! 📝 (Hello!) Lass uns zusammen Deutsch üben. 📝 (Let\'s practice German together.)',
      'it-IT': 'Ciao! 📝 (Hello!) Pratichiamo l\'italiano insieme. 📝 (Let\'s practice Italian together.)',
      'pt-PT': 'Olá! 📝 (Hello!) Vamos praticar português juntos. 📝 (Let\'s practice Portuguese together.)',
      'zh-CN': '你好！📝 (Hello!) 让我们一起练习中文。📝 (Let\'s practice Chinese together.)'
    };

    setMessages([{
      role: 'assistant',
      content: `${greetings[lang.code]}\n\n😊 I'll help you with conversation, grammar, pronunciation, and translations. Use the buttons below to choose what you'd like to practice! 🎯\n\n🚨 Important: I will teach you ${lang.name} ONLY. All my responses will be in ${lang.name} with English translations.`,
      timestamp: Date.now()
    }]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: theme.chatBg || '#FFFFFF' }}>
      {/* Language Selection Screen */}
      {!targetLanguage && (
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          gap: '20px'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
            Welcome! 👋<br/>Which language would you like to practice?
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '12px',
            maxWidth: '400px',
            width: '100%'
          }}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '32px' }}>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      {targetLanguage && (
        <>
          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px' 
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: msg.role === 'user' 
                    ? theme.accent || '#0066FF'
                    : 'rgba(0, 102, 255, 0.08)',
                  color: msg.role === 'user' ? '#fff' : theme.textColor || '#000',
                  fontSize: '14px'
                }}>
                  {msg.role === 'assistant' && (
                    <Sparkles size={16} style={{ display: 'inline', marginRight: '6px', opacity: 0.7 }} />
                  )}
                  {renderMessage(msg)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: '12px', 
                  background: 'rgba(0, 102, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Sparkles size={16} className="sparkle-animation" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mode Buttons */}
          <div style={{ 
            padding: '12px', 
            borderTop: `1px solid ${theme.windowBorder || 'rgba(0,0,0,0.1)'}`,
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap',
            background: theme.toolbarBg || '#F5F5F5',
            alignItems: 'center'
          }}>
            {/* Simple Mode Toggle */}
            <button
              onClick={() => setSimpleMode(!simpleMode)}
              style={{
                padding: '8px 14px',
                background: simpleMode ? '#FFB6C1' : 'rgba(0,0,0,0.05)',
                color: simpleMode ? '#fff' : '#333',
                border: `2px solid ${simpleMode ? '#FFB6C1' : 'transparent'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: simpleMode ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              title={simpleMode ? 'Simple mode ON - Teaching like a 5-year-old' : 'Simple mode OFF - Normal teaching'}
            >
              👶 {simpleMode ? 'Simple' : 'Normal'}
            </button>

            <div style={{ 
              width: '1px', 
              height: '24px', 
              background: 'rgba(0,0,0,0.2)',
              margin: '0 4px'
            }} />

            {/* Mode Buttons */}
            {[
              { mode: 'learn', icon: Sparkles, label: 'Learn', color: '#9B59B6', prompt: 'Start teaching me step by step' },
              { mode: 'chat', icon: MessageCircle, label: 'Chat', color: '#A8E6CF', prompt: '' },
              { mode: 'translate', icon: Languages, label: 'Translate', color: '#FF6B6B', prompt: '' },
              { mode: 'grammar', icon: BookOpen, label: 'Grammar', color: '#4ECDC4', prompt: '' },
              { mode: 'pronunciation', icon: Mic, label: 'Pronunciation', color: '#95E1D3', prompt: '' },
              { mode: 'practice', icon: Lightbulb, label: 'Practice', color: '#F38181', prompt: 'What topic would you like to practice?' },
              { mode: 'vocab', icon: Book, label: 'Vocab', color: '#FFD93D', prompt: 'Review my vocabulary' }
            ].map((btn) => {
              const Icon = btn.icon;
              const isActive = currentMode === btn.mode;
              return (
                <button 
                  key={btn.mode} 
                  onClick={() => {
                    setCurrentMode(btn.mode);
                    if (btn.prompt) setInputValue(btn.prompt);
                  }}
                  style={{
                    padding: '8px 14px',
                    background: isActive ? btn.color : 'rgba(255,255,255,0.15)',
                    color: isActive ? '#fff' : (theme.textColor || '#fff'),
                    border: `2px solid ${isActive ? btn.color : 'rgba(255,255,255,0.3)'}`,
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: isActive ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }
                  }}
                >
                  <Icon size={14} />
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Input Area */}
          <div style={{ 
            borderTop: `1px solid ${theme.windowBorder || 'rgba(0,0,0,0.1)'}`,
            padding: '12px', 
            display: 'flex', 
            gap: '8px',
            background: theme.toolbarBg || '#F5F5F5'
          }}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && inputValue.trim() && handleSend()} 
              placeholder={`Type in ${languageName}...`}
              style={{ 
                flex: 1, 
                padding: '10px 12px', 
                border: '2px solid rgba(0,0,0,0.1)', 
                borderRadius: '8px', 
                fontSize: '14px', 
                outline: 'none',
                background: '#fff'
              }}
              disabled={isLoading}
            />
            {isSupported && (
              <button 
                onClick={isListening ? stopListening : startListening}
                style={{
                  padding: '10px 12px', 
                  background: isListening ? '#FF4444' : currentMode === 'pronunciation' ? '#95E1D3' : 'rgba(0,102,255,0.1)', 
                  color: isListening ? '#fff' : currentMode === 'pronunciation' ? '#000' : '#0066FF',
                  border: `2px solid ${isListening ? '#FF4444' : currentMode === 'pronunciation' ? '#95E1D3' : 'rgba(0,102,255,0.3)'}`,
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  position: 'relative'
                }}
                title={currentMode === 'pronunciation' 
                  ? (isListening ? 'Stop recording - will evaluate pronunciation' : 'Record for pronunciation evaluation') 
                  : (isListening ? 'Stop recording' : 'Voice input')}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                {currentMode === 'pronunciation' && !isListening && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '12px',
                    height: '12px',
                    background: '#95E1D3',
                    borderRadius: '50%',
                    border: '2px solid #fff'
                  }} />
                )}
              </button>
            )}
            <button 
              onClick={() => handleSend()} 
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '10px 18px', 
                background: isLoading || !inputValue.trim() ? '#ccc' : theme.accent || '#0066FF', 
                color: '#fff', 
                border: 'none',
                borderRadius: '8px', 
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontWeight: 'bold'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .sparkle-animation {
          animation: sparkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
