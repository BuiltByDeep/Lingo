# AI Language Buddy - Implementation Guide

## Overview

The AI Language Buddy is a multi-language learning assistant that provides interactive language practice through 7 distinct modes. The system is built with strict language independence - each language works completely independently without defaulting to Spanish or mixing languages.

## Core Architecture

### Component Location
- **Main Component**: `lingo-app/src/components/Windows/AIBuddyWindow.jsx`
- **AI Service**: `lingo-app/src/services/gemini.js`
- **Spec Files**: `.kiro/specs/ai-language-buddy/`

### Key Design Principles

1. **Language Independence**: Each language (Korean, French, Japanese, etc.) must work independently
2. **Dynamic System Prompts**: System prompts are generated dynamically based on selected language and mode
3. **Bilingual Format**: All target language content must include 📝 (English translation)
4. **Mode Isolation**: Each mode has distinct behavior and stays active until user switches
5. **Plain Text Responses**: AI returns natural language, not JSON or code blocks

## State Management

### Critical State Variables

```javascript
const [targetLanguage, setTargetLanguage] = useState(null);  // e.g., 'ko-KR', 'fr-FR'
const [languageName, setLanguageName] = useState(null);      // e.g., 'Korean', 'French'
const [currentMode, setCurrentMode] = useState('learn');     // 'learn', 'chat', 'translate', etc.
const [simpleMode, setSimpleMode] = useState(true);          // Beginner-friendly mode
const [messages, setMessages] = useState([]);                // Conversation history
```

### State Flow

1. User opens AI Buddy → `targetLanguage` is null → Show language selection screen
2. User selects language → Set `targetLanguage` and `languageName` → Show chat interface
3. User interacts → Generate dynamic system prompt using current state → Send to AI
4. AI responds → Display in bilingual format → Update messages

## Supported Languages

```javascript
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
```

## Learning Modes

### 1. Learn Mode (📚)
- **Purpose**: Structured step-by-step lessons
- **Behavior**: Provides lessons with Topic, Explanation, Examples, Exercise
- **Format**: ONE lesson at a time, wait for "continue"
- **Color**: Purple (#9B59B6)

### 2. Chat Mode (💬)
- **Purpose**: Conversational practice
- **Behavior**: Natural dialogue in target language with translations
- **Format**: 2-3 sentences max, ONE follow-up question
- **Color**: Light Green (#A8E6CF)

### 3. Translate Mode (🔄)
- **Purpose**: Translation with multiple versions
- **Behavior**: Provides direct, simplified, and advanced translations
- **Format**: 4 components - direct, simple, advanced, grammar note
- **Color**: Red (#FF6B6B)

### 4. Grammar Mode (✏️)
- **Purpose**: Grammar correction and explanation
- **Behavior**: Corrects sentences and explains rules
- **Format**: Corrected sentence + rule + example + practice prompt
- **Color**: Teal (#4ECDC4)

### 5. Pronunciation Mode (🗣️)
- **Purpose**: Pronunciation evaluation and guidance
- **Behavior**: Evaluates spoken input, provides score 1-10
- **Format**: Score + feedback + mispronounced words + tips
- **Color**: Mint (#95E1D3)
- **Special**: Auto-evaluates when voice input received

### 6. Practice Mode (🎭)
- **Purpose**: Scenario-based role-play
- **Behavior**: AI plays role in scenarios (Restaurant, Airport, Shopping, Doctor, Work)
- **Format**: ONE question at a time, realistic dialogue
- **Color**: Pink (#F38181)

### 7. Vocab Mode (📖)
- **Purpose**: Vocabulary building and review
- **Behavior**: Tracks learned words, offers quizzes
- **Format**: Word + meaning + example + pronunciation
- **Color**: Yellow (#FFD93D)

## Simple Mode

### When Simple Mode is ON (👶)
- Maximum 5-7 words per sentence in target language
- Lots of emojis (😊 🎉 ⭐ 👍 🌟)
- Extremely encouraging language
- Explain like teaching a 5-year-old
- No grammar jargon

### When Simple Mode is OFF
- Natural conversational language
- Sentences can be 10-15 words
- More detailed explanations
- Professional but still encouraging
- Less emojis

## System Prompt Generation

### Critical Rules for System Prompts

1. **Always use `${languageName}` variable** - Never hardcode language names
2. **Start with absolute language declaration** - "YOU MUST RESPOND IN [LANGUAGE] ONLY!"
3. **Include explicit rules for each language** - "If teaching Korean → Use KOREAN words"
4. **Specify output format** - "NEVER return JSON, code blocks, arrays, or structured data"
5. **Include bilingual format rules** - "EVERY sentence must have 📝 (English translation)"
6. **Add mode-specific instructions** - Different behavior for each mode
7. **Include Simple Mode rules** - If simpleMode is true
8. **End with final reminder** - Reinforce target language

### System Prompt Structure

```javascript
const generateSystemPrompt = (mode) => {
  return `
    1. ABSOLUTE LANGUAGE DECLARATION
       - YOU MUST RESPOND IN ${languageName.toUpperCase()} ONLY!
       - DO NOT USE SPANISH unless Spanish is the target language
       
    2. LANGUAGE RULES (CANNOT BE VIOLATED)
       - If teaching Korean → Use KOREAN words
       - If teaching French → Use FRENCH words
       - NEVER default to Spanish
       
    3. BILINGUAL FORMAT (MANDATORY)
       - EVERY sentence in ${languageName} MUST have 📝 (English translation)
       - Format: "${languageName} text 📝 (English translation)"
       
    4. SIMPLE MODE RULES (if simpleMode is true)
       - Maximum 5-7 words per sentence
       - Lots of emojis
       - Teach like explaining to a 5-year-old
       
    5. OUTPUT FORMAT
       - NEVER return JSON, code blocks, arrays
       - ALWAYS reply in plain natural language
       
    6. MODE-SPECIFIC INSTRUCTIONS
       - [Different for each mode]
       
    7. FINAL REMINDER
       - YOU ARE TEACHING ${languageName.toUpperCase()}!
       - Check every phrase - is it in ${languageName}?
  `;
};
```

## Message Handling

### Sending Messages to AI

```javascript
const handleSend = async () => {
  // 1. Create user message
  const userMessage = { role: 'user', content: inputValue, timestamp: Date.now() };
  
  // 2. Generate dynamic system prompt
  const systemPrompt = generateSystemPrompt(currentMode);
  
  // 3. Add language reminder to user message
  const userMessageWithReminder = `[REMINDER: Respond in ${languageName.toUpperCase()} only]\n\n${inputValue}`;
  
  // 4. Build API messages array
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...previousMessages.map(({ role, content }) => ({ role, content })),
    { role: 'user', content: userMessageWithReminder }
  ];
  
  // 5. Send to AI
  const aiContent = await sendMessageToAI(apiMessages);
  
  // 6. Display response
  setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
};
```

### Gemini Service Integration

The `gemini.js` service MUST properly extract and use the system prompt from the messages array:

```javascript
export async function sendMessageToAI(messages) {
  // Extract system prompt and conversation history
  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');
  
  // Build full prompt with system instructions first
  let fullPrompt = '';
  if (systemMessage) {
    fullPrompt = `${systemMessage.content}\n\n`;
  }
  
  // Add conversation history
  fullPrompt += 'Conversation:\n';
  conversationMessages.forEach(msg => {
    fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
  });
  
  fullPrompt += 'Assistant:';
  
  // Send to Gemini API
  const result = await model.generateContent(fullPrompt);
  return result.response.text();
}
```

## Voice Input Integration

### Speech Recognition Hook

```javascript
const { isListening, transcript, isSupported, startListening, stopListening } = 
  useSpeechRecognition(targetLanguage || 'en-US');
```

### Pronunciation Mode Auto-Evaluation

```javascript
useEffect(() => {
  if (transcript && currentMode === 'pronunciation') {
    // Auto-evaluate pronunciation
    setInputValue(transcript);
    setTimeout(() => {
      handlePronunciationFeedback(transcript);
    }, 500);
  } else if (transcript) {
    // Just fill input for other modes
    setInputValue(transcript);
  }
}, [transcript, currentMode]);
```

## UI Components

### Language Selection Screen

- Grid layout (2 columns)
- 8 language buttons with flags
- Gradient background (#667eea to #764ba2)
- Hover effect (scale 1.05)
- On click: Sets language and shows greeting

### Mode Buttons

- 7 mode buttons in a row
- Visual indicators: Icon + Label + Color
- Active mode highlighted with bold text and colored background
- Inactive modes have subtle gray background
- Separator line between Simple Mode toggle and mode buttons

### Simple Mode Toggle

- Button with 👶 emoji
- Pink background (#FFB6C1) when active
- Gray background when inactive
- Tooltip explains behavior

### Message Display

- User messages: Right-aligned, blue background
- AI messages: Left-aligned, light blue background
- Sparkles icon (✨) for AI messages
- Pre-wrap text with proper word breaking
- Auto-scroll to bottom on new messages

### Input Area

- Text input with language-specific placeholder
- Microphone button (if supported)
- Send button (disabled when empty or loading)
- Special indicator on mic button in Pronunciation mode

## Common Issues and Solutions

### Issue 1: AI Defaults to Spanish

**Problem**: AI responds in Spanish regardless of selected language

**Root Cause**: System prompt not properly passed to AI service

**Solution**: 
1. Ensure `generateSystemPrompt()` uses `${languageName}` variable
2. Verify `gemini.js` extracts system message from messages array
3. Add language reminder to every user message

### Issue 2: JSON Format Displayed

**Problem**: AI returns JSON which displays as raw text

**Root Cause**: System prompt requests JSON format

**Solution**:
1. Change system prompt to request plain natural language
2. Add explicit rule: "NEVER return JSON, code blocks, arrays"
3. Remove JSON parsing logic from component

### Issue 3: Text Breaking Mid-Word

**Problem**: Long words break in the middle

**Root Cause**: CSS `wordBreak: 'break-word'`

**Solution**:
```javascript
style={{ 
  whiteSpace: 'pre-wrap', 
  overflowWrap: 'anywhere', 
  wordBreak: 'normal' 
}}
```

### Issue 4: Mode Behavior Mixing

**Problem**: AI mixes behaviors from different modes

**Root Cause**: System prompt doesn't enforce mode isolation

**Solution**:
1. Add mode-specific instructions to system prompt
2. Include rule: "Stay in [mode] mode until user switches"
3. Remind AI of current mode in every message

## Testing Guidelines

### Manual Testing Checklist

- [ ] Select Korean → Verify responses use Korean (not Spanish)
- [ ] Select French → Verify responses use French (not Spanish)
- [ ] Select Japanese → Verify responses use Japanese (not Spanish)
- [ ] Test all 8 languages independently
- [ ] Switch between modes → Verify behavior changes
- [ ] Toggle Simple Mode → Verify sentence length changes
- [ ] Use voice input → Verify transcript appears
- [ ] Pronunciation mode → Verify auto-evaluation
- [ ] Check bilingual format (📝) in all responses
- [ ] Verify ONE question per interaction in Learn/Practice modes

### Property-Based Testing

Use **fast-check** library for property tests:

```javascript
import fc from 'fast-check';

// Property 1: Language Consistency
fc.assert(
  fc.property(
    fc.constantFrom('Korean', 'French', 'Japanese', 'German'),
    fc.string(),
    async (language, userMessage) => {
      const response = await getAIResponse(language, userMessage);
      return containsOnlyTargetLanguage(response, language);
    }
  )
);
```

## Modification Guidelines

### Adding a New Language

1. Add to `LANGUAGES` array with code, name, and flag
2. Add greeting to `greetings` object in `handleLanguageSelect()`
3. Test independently to ensure no Spanish defaulting

### Adding a New Mode

1. Add mode button configuration with icon, label, color, prompt
2. Add mode-specific instructions to `generateSystemPrompt()`
3. Update mode button rendering logic
4. Test mode isolation

### Modifying System Prompt

1. Always use `${languageName}` variable, never hardcode
2. Test with multiple languages to ensure independence
3. Keep language rules at the top (highest priority)
4. Include explicit examples using selected language
5. End with final reminder of target language

### Changing AI Response Format

1. Update system prompt output format rules
2. Update message rendering logic
3. Test with all modes to ensure consistency
4. Verify bilingual format still works

## Best Practices

### Do's ✅

- Use dynamic system prompts with `${languageName}`
- Test each language independently
- Keep mode behaviors distinct and isolated
- Include bilingual format (📝) in all responses
- Provide clear visual feedback for active mode
- Auto-scroll to bottom on new messages
- Handle errors gracefully with friendly messages
- Use proper React hooks (onKeyDown, not onKeyPress)

### Don'ts ❌

- Never hardcode language examples in system prompts
- Never assume Spanish as default language
- Never mix mode behaviors
- Never return JSON from AI (use plain text)
- Never skip language reminder in user messages
- Never ignore system prompt in AI service
- Never use deprecated React APIs
- Never leave debug console.logs in production

## File References

### Key Files to Modify

- **Component**: `lingo-app/src/components/Windows/AIBuddyWindow.jsx`
- **AI Service**: `lingo-app/src/services/gemini.js`
- **Speech Hook**: `lingo-app/src/hooks/useSpeechRecognition.js`

### Spec Files for Reference

- **Requirements**: `.kiro/specs/ai-language-buddy/requirements.md`
- **Design**: `.kiro/specs/ai-language-buddy/design.md`
- **Tasks**: `.kiro/specs/ai-language-buddy/tasks.md`

## Quick Reference

### Language Independence Checklist

- [ ] System prompt uses `${languageName}` variable
- [ ] Language rules explicitly list all 8 languages
- [ ] "NEVER default to Spanish" rule included
- [ ] Language reminder added to user messages
- [ ] Gemini service extracts system prompt correctly
- [ ] Tested with Korean, French, Japanese independently

### Bilingual Format Checklist

- [ ] System prompt requires 📝 (English translation)
- [ ] Format specified: "[Language] 📝 (English)"
- [ ] Examples show bilingual format
- [ ] All modes maintain bilingual format
- [ ] Greetings use bilingual format

### Mode System Checklist

- [ ] 7 mode buttons rendered correctly
- [ ] Active mode visually highlighted
- [ ] Mode-specific instructions in system prompt
- [ ] Mode isolation enforced
- [ ] Mode switching updates state correctly

## Troubleshooting

### AI Not Responding in Selected Language

1. Check `targetLanguage` and `languageName` state values
2. Verify `generateSystemPrompt()` uses correct variables
3. Check `gemini.js` extracts system message
4. Add console.log to see actual system prompt sent
5. Verify language reminder in user message

### Bilingual Format Missing

1. Check system prompt includes 📝 format rules
2. Verify format examples use selected language
3. Test with Simple Mode ON and OFF
4. Check if AI is following instructions

### Mode Not Working Correctly

1. Verify `currentMode` state updates on button click
2. Check mode-specific instructions in system prompt
3. Test mode isolation (doesn't mix with other modes)
4. Verify mode button visual feedback

### Voice Input Not Working

1. Check browser supports Web Speech API (Chrome/Edge)
2. Verify microphone permissions granted
3. Check `targetLanguage` is set correctly
4. Test with different languages
5. Verify auto-evaluation in Pronunciation mode

## Summary

The AI Language Buddy is built on three core principles:

1. **Language Independence**: Each language works completely independently
2. **Dynamic System Prompts**: Prompts are generated based on current state
3. **Mode Isolation**: Each mode has distinct behavior

When modifying this component, always test with multiple languages to ensure independence, verify bilingual format appears correctly, and confirm mode behaviors remain isolated.
