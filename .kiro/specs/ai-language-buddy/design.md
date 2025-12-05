# AI Language Buddy - Design Document

## Overview

The AI Language Buddy is a complete rebuild focused on language independence and mode consistency. The system will use a strict language selection mechanism and mode-based interaction system to ensure users receive content in their chosen language without mixing or defaulting to Spanish.

## Architecture

### Component Structure

```
AIBuddyWindow (Main Component)
├── Language Selection Screen (Initial)
├── Chat Interface (After language selected)
│   ├── Message Display Area
│   ├── Mode Selector Buttons
│   ├── Simple Mode Toggle
│   └── Input Area with Voice Support
└── System Prompt Generator (Dynamic based on language + mode)
```

### State Management

- `targetLanguage`: Selected language code (e.g., 'ko-KR', 'fr-FR')
- `languageName`: Human-readable language name (e.g., 'Korean', 'French')
- `currentMode`: Active mode ('learn', 'chat', 'translate', 'grammar', 'pronunciation', 'practice', 'vocab')
- `simpleMode`: Boolean for beginner-friendly teaching
- `messages`: Array of conversation history
- `isLoading`: Boolean for AI response state

## Components and Interfaces

### Language Selection

**Purpose**: Ensure user explicitly chooses their target language before any interaction.

**Interface**:
- Grid of 8 language buttons with flags
- Each button shows: Flag emoji + Language name
- On selection: Sets `targetLanguage` and `languageName`, displays greeting

**Languages Supported**:
1. Spanish (es-ES) 🇪🇸
2. French (fr-FR) 🇫🇷
3. Japanese (ja-JP) 🇯🇵
4. Korean (ko-KR) 🇰🇷
5. German (de-DE) 🇩🇪
6. Italian (it-IT) 🇮🇹
7. Portuguese (pt-PT) 🇵🇹
8. Chinese (zh-CN) 🇨🇳

### Mode System

**7 Distinct Modes**:

1. **Learn Mode** - Structured lessons with 5-part format
2. **Chat Mode** - Conversational practice in target language
3. **Translate Mode** - Translation with multiple versions
4. **Grammar Mode** - Grammar correction and explanation
5. **Pronunciation Mode** - Phonetic guidance and evaluation
6. **Practice Mode** - Scenario-based role-play
7. **Vocab Mode** - Vocabulary building and review

**Mode Buttons**:
- Visual indicators (icon + label + color)
- Active mode highlighted
- Click to switch modes
- Each mode has distinct behavior

### System Prompt Architecture

**Critical Design Decision**: The system prompt MUST be dynamically generated based on:
1. Selected `languageName` (not hardcoded)
2. Current `mode`
3. `simpleMode` state

**Prompt Structure**:
```
1. ABSOLUTE LANGUAGE DECLARATION
   - "YOU ARE TEACHING: [LANGUAGE NAME]"
   - Explicit rules for each language
   
2. MODE-SPECIFIC INSTRUCTIONS
   - Behavior rules for current mode
   - Response format requirements
   
3. BILINGUAL FORMAT RULES
   - Mandatory 📝 (English translation) format
   - Examples in selected language
   
4. SIMPLE MODE RULES (if enabled)
   - 5-7 words max per sentence
   - Lots of emojis and encouragement
   
5. RESPONSE FORMAT
   - JSON structure with sections
   - Follow-up questions
```

## Data Models

### Message Object
```javascript
{
  role: 'user' | 'assistant',
  content: string,
  timestamp: number,
  structured: {
    reply: string,
    mode: string,
    targetLanguage: string,
    sections: Array<Section>,
    followUpQuestion: string,
    vocabUpdates: Array<VocabItem>,
    voiceFeedback: VoiceFeedback
  }
}
```

### Section Object
```javascript
{
  type: 'lesson' | 'tip' | 'translation' | 'grammar-note' | 'pronunciation' | 'quiz' | 'scenario-step',
  label: string,
  content: string
}
```

### VocabItem Object
```javascript
{
  word: string,
  meaning: string,
  example: string,
  pronunciation: string,
  difficulty: 'easy' | 'medium' | 'hard'
}
```

### VoiceFeedback Object
```javascript
{
  score: number (1-10),
  comment: string,
  mispronouncedWords: Array<{
    word: string,
    ipa: string,
    tip: string
  }>
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Language Consistency
*For any* selected language and any mode, all target language content in AI responses should be in the selected language, not Spanish or any other language.
**Validates: Requirements 1.5, 2.1, 2.2, 2.3, 2.4**

### Property 2: Bilingual Format Compliance
*For any* AI response containing target language text, each sentence should be followed by 📝 (English translation).
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 3: Mode Isolation
*For any* active mode, the AI should stay in that mode's behavior pattern until the user explicitly switches modes.
**Validates: Requirements 5.2, 6.2**

### Property 4: Simple Mode Sentence Length
*For any* AI response when Simple Mode is ON, each sentence in the target language should contain maximum 5-7 words.
**Validates: Requirements 4.2**

### Property 5: Learn Mode Structure
*For any* lesson in Learn mode, the response should contain exactly 5 parts: Topic, Explanation, Examples, Exercise, Feedback prompt.
**Validates: Requirements 6.1**

### Property 6: One Question Per Interaction
*For any* Learn mode lesson or Practice mode scenario, the AI should ask exactly ONE question and wait for user response.
**Validates: Requirements 6.5, 8.3, 9.5, 11.4**

### Property 7: Pronunciation Score Range
*For any* pronunciation evaluation, the score should be an integer between 1 and 10 inclusive.
**Validates: Requirements 7.3**

### Property 8: Translation Completeness
*For any* translation request, the response should include all 4 components: direct translation, simpler version, advanced version, and grammar note.
**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Property 9: Scenario Topic Selection
*For any* Practice mode activation, if no scenario is specified, the AI should first ask the user to choose from the available scenario topics.
**Validates: Requirements 11.1, 11.2**

### Property 10: Vocabulary Entry Completeness
*For any* vocabulary item provided, it should include all required fields: word, meaning, example sentence, and pronunciation.
**Validates: Requirements 12.2**

## Error Handling

### Language Detection Errors
- If `targetLanguage` is null or undefined, show language selection screen
- If language code is invalid, default to language selection

### AI Response Errors
- If AI fails to respond, show friendly error message
- If JSON parsing fails, display plain text response
- Retry mechanism for network failures

### Voice Input Errors
- If speech recognition not supported, hide microphone button
- If microphone permission denied, show permission request message
- If no speech detected, show "No speech detected" message

### Mode Switching Errors
- Validate mode exists before switching
- Preserve conversation history across mode switches
- Clear mode-specific state when switching

## Testing Strategy

### Unit Testing
- Test language selection sets correct state
- Test mode switching updates currentMode
- Test message rendering for different structures
- Test bilingual format parsing
- Test Simple Mode toggle

### Property-Based Testing

We will use **fast-check** (JavaScript property-based testing library) for testing universal properties.

#### Property Test 1: Language Consistency
- Generate random language selections
- Generate random user messages
- Verify AI responses contain only the selected language (not Spanish)
- **Feature: ai-language-buddy, Property 1: Language Consistency**

#### Property Test 2: Bilingual Format
- Generate random AI responses with target language content
- Verify each sentence has 📝 (English translation) immediately after
- **Feature: ai-language-buddy, Property 2: Bilingual Format Compliance**

#### Property Test 3: Mode Isolation
- Generate random mode selections and user messages
- Verify AI stays in selected mode behavior
- **Feature: ai-language-buddy, Property 3: Mode Isolation**

#### Property Test 4: Simple Mode Sentence Length
- Generate random messages with Simple Mode ON
- Parse target language sentences
- Verify each sentence has ≤ 7 words
- **Feature: ai-language-buddy, Property 4: Simple Mode Sentence Length**

#### Property Test 5: Learn Mode Structure
- Generate random Learn mode lessons
- Verify response contains all 5 required parts
- **Feature: ai-language-buddy, Property 5: Learn Mode Structure**

#### Property Test 6: One Question Rule
- Generate random Learn/Practice mode interactions
- Count questions in AI response
- Verify exactly 1 question per response
- **Feature: ai-language-buddy, Property 6: One Question Per Interaction**

#### Property Test 7: Pronunciation Score Range
- Generate random pronunciation evaluations
- Extract score from response
- Verify 1 ≤ score ≤ 10
- **Feature: ai-language-buddy, Property 7: Pronunciation Score Range**

#### Property Test 8: Translation Completeness
- Generate random translation requests
- Verify response has all 4 required components
- **Feature: ai-language-buddy, Property 8: Translation Completeness**

### Integration Testing
- Test full conversation flow from language selection to multi-turn dialogue
- Test mode switching mid-conversation
- Test voice input integration with pronunciation mode
- Test message persistence across component re-renders

### Manual Testing Scenarios
- Select Korean → Verify all responses use Korean (not Spanish)
- Select French → Verify all responses use French (not Spanish)
- Switch between modes → Verify behavior changes appropriately
- Toggle Simple Mode → Verify sentence length and emoji usage changes
- Use voice input in Pronunciation mode → Verify evaluation provided

## Implementation Notes

### Critical Implementation Rules

1. **Never Hardcode Language Examples**: All examples in system prompts must use `${languageName}` variable
2. **Language Name Extraction**: Always extract language name from LANGUAGES array using targetLanguage code
3. **Mode-Specific Prompts**: Each mode should have distinct instructions in system prompt
4. **JSON Response Parsing**: Always attempt to parse JSON, fallback to plain text
5. **State Persistence**: Maintain conversation history across mode switches
6. **Voice Integration**: Pronunciation mode should auto-evaluate when voice input received

### System Prompt Best Practices

1. Start with ABSOLUTE LANGUAGE DECLARATION in all caps
2. Use triple warning emojis (🚨🚨🚨) for critical rules
3. Provide explicit examples for each mode using selected language
4. Include "CANNOT BE VIOLATED" language for strict rules
5. End with final reminder of target language

### UI/UX Considerations

- Language selection should be prominent and clear
- Mode buttons should have visual feedback (active state)
- Simple Mode toggle should be easily accessible
- Bilingual format should be visually distinct (📝 emoji helps)
- Loading states should be clear during AI responses
- Error messages should be friendly and actionable
