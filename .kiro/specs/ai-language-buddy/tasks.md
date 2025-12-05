# Implementation Plan

- [x] 1. Backup and prepare for rebuild
  - Create backup of current AIBuddyWindow.jsx
  - Review existing voice integration hooks
  - _Requirements: All_

- [x] 2. Create new AIBuddyWindow component structure
  - Set up component with clean state management
  - Define LANGUAGES constant with all 8 languages
  - Initialize state: targetLanguage, languageName, currentMode, simpleMode, messages, isLoading
  - _Requirements: 1.1, 1.4_

- [x] 3. Implement language selection screen
  - Create language selection UI with 8 language buttons (grid layout)
  - Add flag emojis and language names to buttons
  - Implement handleLanguageSelect function
  - Set targetLanguage and languageName on selection
  - Display bilingual greeting after selection
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ]* 3.1 Write property test for language selection
  - **Property 1: Language Consistency**
  - **Validates: Requirements 1.5, 2.1, 2.2, 2.3, 2.4**

- [x] 4. Build mode selector interface
  - Create 7 mode buttons: Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab
  - Add icons and colors for each mode
  - Implement handleModeChange function
  - Add visual indicator for active mode
  - _Requirements: 5.1, 5.2_

- [x] 5. Implement Simple Mode toggle
  - Create toggle button with 👶 emoji
  - Add visual feedback for ON/OFF state
  - Update simpleMode state on toggle
  - _Requirements: 4.1, 4.5_

- [x] 6. Create dynamic system prompt generator
  - Build function that generates system prompt based on languageName, mode, and simpleMode
  - Add ABSOLUTE LANGUAGE DECLARATION at top
  - Include language-specific rules (Korean → Korean, French → French, etc.)
  - Add mode-specific instructions for each of 7 modes
  - Include bilingual format rules with 📝 emoji requirement
  - Add Simple Mode rules (5-7 words, emojis, encouragement)
  - Include JSON response format specification
  - Add final language reminder at end
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 4.2, 4.3_

- [ ]* 6.1 Write property test for bilingual format
  - **Property 2: Bilingual Format Compliance**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

- [x] 7. Implement Learn Mode behavior
  - Add Learn Mode instructions to system prompt
  - Specify 5-part lesson structure: Topic, Explanation, Examples, Exercise, Feedback
  - Add rule: ONE lesson at a time, wait for "continue"
  - Add rule: 3-5 examples with pronunciation guides
  - Add rule: ONE exercise question per lesson
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 7.1 Write property test for Learn Mode structure
  - **Property 5: Learn Mode Structure**
  - **Validates: Requirements 6.1**

- [ ]* 7.2 Write property test for one question rule
  - **Property 6: One Question Per Interaction**
  - **Validates: Requirements 6.5, 8.3, 9.5, 11.4**

- [x] 8. Implement Chat Mode behavior
  - Add Chat Mode instructions to system prompt
  - Specify: Respond ONLY in target language with 📝 translations
  - Specify: Keep responses SHORT (2-3 sentences max)
  - Specify: Ask ONE follow-up question
  - Specify: Provide tips for better phrasing when appropriate
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Implement Translate Mode behavior
  - Add Translate Mode instructions to system prompt
  - Specify 4 required components: direct, simpler, advanced, grammar note
  - Add pronunciation guidance requirement
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 9.1 Write property test for translation completeness
  - **Property 8: Translation Completeness**
  - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**

- [x] 10. Implement Grammar Mode behavior
  - Add Grammar Mode instructions to system prompt
  - Specify 4-part structure: corrected sentence, rule explanation, example, practice prompt
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 11. Implement Pronunciation Mode behavior
  - Add Pronunciation Mode instructions to system prompt
  - Specify text pronunciation: IPA notation, tongue/mouth placement, phonetic breakdown
  - Specify voice pronunciation: score 1-10, mispronounced words, tips
  - Create handlePronunciationFeedback function with language-aware prompt
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 11.1 Write property test for pronunciation score range
  - **Property 7: Pronunciation Score Range**
  - **Validates: Requirements 7.3**

- [x] 12. Implement Practice Mode (Scenario) behavior
  - Add Practice Mode instructions to system prompt
  - Specify available scenarios: Restaurant, Shopping, Airport, Doctor, Work
  - Add rule: Ask user to choose scenario first
  - Add rule: Role-play in character
  - Add rule: ONE question at a time
  - Add rule: Bilingual format with 📝 translations
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ]* 12.1 Write property test for scenario topic selection
  - **Property 9: Scenario Topic Selection**
  - **Validates: Requirements 11.1, 11.2**

- [x] 13. Implement Vocab Mode behavior
  - Add Vocab Mode instructions to system prompt
  - Specify vocab entry format: word, meaning, example, pronunciation
  - Add rule: Offer quiz when 10+ words learned
  - Add rule: Track struggling words
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ]* 13.1 Write property test for vocabulary entry completeness
  - **Property 10: Vocabulary Entry Completeness**
  - **Validates: Requirements 12.2**

- [x] 14. Implement main message sending function
  - Create handleSend function
  - Extract languageName from targetLanguage
  - Generate dynamic system prompt based on languageName, mode, simpleMode
  - Send messages to AI with proper context
  - Parse JSON response with fallback to plain text
  - Update messages state with structured response
  - _Requirements: 2.5, 3.5, 5.3, 5.4, 5.5_

- [ ]* 14.1 Write property test for mode isolation
  - **Property 3: Mode Isolation**
  - **Validates: Requirements 5.2, 6.2**

- [x] 15. Integrate voice input for pronunciation
  - Import useSpeechRecognition hook
  - Add microphone button to input area
  - Connect voice input to pronunciation evaluation in Pronunciation mode
  - Auto-evaluate pronunciation when voice input received in Pronunciation mode
  - Show visual indicator for Pronunciation mode microphone
  - _Requirements: 7.1, 7.2_

- [x] 16. Implement message rendering
  - Create renderStructuredMessage function
  - Handle plain text messages
  - Handle structured messages with sections
  - Render sections with proper styling (lesson, tip, translation, grammar-note, etc.)
  - Render follow-up questions with distinct styling
  - Apply proper text wrapping (overflowWrap: 'anywhere', wordBreak: 'normal')
  - _Requirements: 3.2, 3.3_

- [ ]* 16.1 Write property test for Simple Mode sentence length
  - **Property 4: Simple Mode Sentence Length**
  - **Validates: Requirements 4.2**

- [x] 17. Add error handling
  - Handle null/undefined targetLanguage → show language selection
  - Handle AI response errors → show friendly error message
  - Handle JSON parsing errors → fallback to plain text
  - Handle voice input errors → show appropriate messages
  - Handle mode switching errors → validate mode exists
  - _Requirements: All_

- [x] 18. Style and polish UI
  - Apply theme-aware styling
  - Add smooth transitions for mode switching
  - Add loading animation during AI responses
  - Ensure responsive layout
  - Add hover effects for buttons
  - _Requirements: All_

- [x] 19. Final testing and validation
  - Test Korean selection → verify Korean responses (not Spanish)
  - Test French selection → verify French responses (not Spanish)
  - Test all 8 languages independently
  - Test all 7 modes with different languages
  - Test Simple Mode toggle effect
  - Test voice input in Pronunciation mode
  - Test mode switching preserves conversation
  - Test bilingual format appears correctly
  - _Requirements: All_

- [x] 20. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
