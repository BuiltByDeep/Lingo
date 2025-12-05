# Requirements Document

## Introduction

The AI Language Buddy is an interactive language learning assistant that helps users practice and learn a target language through conversation, grammar correction, pronunciation feedback, and structured lessons. The system must support multiple languages independently and provide bilingual responses (target language + English translation) to help beginners understand.

## Glossary

- **Target Language**: The language the user has selected to learn (e.g., Korean, French, Japanese)
- **Language Buddy**: The AI assistant that teaches the target language
- **Bilingual Format**: Displaying text in both the target language and English translation
- **Simple Mode**: A teaching mode that uses extremely simple language suitable for beginners
- **Mode**: The type of interaction (Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab)

## Requirements

### Requirement 1: Language Selection

**User Story:** As a language learner, I want to select which language I want to practice, so that the AI teaches me in my chosen language.

#### Acceptance Criteria

1. WHEN the AI Buddy window opens, THE system SHALL display a language selection screen with 8 language options
2. WHEN a user selects a language, THE system SHALL set that language as the target language for all subsequent interactions
3. WHEN a language is selected, THE system SHALL greet the user in the selected target language with English translation
4. THE system SHALL support Spanish, French, Japanese, Korean, German, Italian, Portuguese, and Chinese
5. WHEN a user selects Korean, THE system SHALL use Korean language content, NOT Spanish or any other language

### Requirement 2: Language-Specific Content

**User Story:** As a language learner, I want all teaching content to be in my selected language, so that I learn the correct language.

#### Acceptance Criteria

1. WHEN teaching Korean, THE system SHALL use Korean words, phrases, and sentences exclusively
2. WHEN teaching French, THE system SHALL use French words, phrases, and sentences exclusively
3. WHEN teaching Japanese, THE system SHALL use Japanese words, phrases, and sentences exclusively
4. THE system SHALL NOT default to Spanish or mix languages
5. EVERY response in the target language SHALL include an English translation immediately after using the 📝 emoji

### Requirement 3: Bilingual Response Format

**User Story:** As a beginner language learner, I want to see English translations for everything, so that I can understand what I'm learning.

#### Acceptance Criteria

1. WHEN the AI responds in the target language, THE system SHALL include 📝 (English translation) after each sentence
2. THE format SHALL be: "[Target language text] 📝 (English translation)"
3. WHEN displaying examples, THE system SHALL show both the target language and English meaning
4. WHEN asking questions, THE system SHALL provide the question in target language with English translation
5. THE system SHALL maintain bilingual format across all modes (Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab)

### Requirement 4: Simple Mode Toggle

**User Story:** As a beginner, I want a simple teaching mode that uses very basic language, so that I don't get overwhelmed.

#### Acceptance Criteria

1. THE system SHALL provide a Simple Mode toggle button labeled with 👶 emoji
2. WHEN Simple Mode is ON, THE system SHALL use maximum 5-7 words per sentence in target language
3. WHEN Simple Mode is ON, THE system SHALL use lots of emojis and encouraging language
4. WHEN Simple Mode is OFF, THE system SHALL use natural conversational language with longer sentences
5. THE system SHALL default to Simple Mode ON for beginners

### Requirement 5: Multiple Learning Modes

**User Story:** As a language learner, I want different ways to practice (conversation, grammar, pronunciation), so that I can focus on specific skills.

#### Acceptance Criteria

1. THE system SHALL provide 7 distinct modes: Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab
2. WHEN a user selects a mode, THE system SHALL stay in that mode until the user switches
3. WHEN in Learn mode, THE system SHALL provide structured step-by-step lessons
4. WHEN in Chat mode, THE system SHALL engage in conversational practice
5. WHEN in Pronunciation mode, THE system SHALL evaluate spoken input and provide feedback

### Requirement 6: Learn Mode Structure

**User Story:** As a beginner, I want structured lessons that teach me step-by-step, so that I can build my knowledge systematically.

#### Acceptance Criteria

1. WHEN in Learn mode, THE system SHALL follow a 5-part lesson structure: Topic, Explanation, Examples, Exercise, Feedback
2. THE system SHALL present ONE lesson at a time
3. WHEN a lesson is complete, THE system SHALL wait for user to type "continue" before proceeding
4. THE system SHALL provide 3-5 examples per lesson with pronunciation guides
5. THE system SHALL ask ONE exercise question per lesson

### Requirement 7: Voice Input Support

**User Story:** As a language learner, I want to practice pronunciation by speaking, so that I can improve my speaking skills.

#### Acceptance Criteria

1. THE system SHALL provide a microphone button for voice input
2. WHEN in Pronunciation mode and user clicks microphone, THE system SHALL record and evaluate pronunciation
3. WHEN pronunciation is evaluated, THE system SHALL provide a score from 1-10
4. THE system SHALL highlight mispronounced words with specific tips
5. THE system SHALL provide encouraging feedback regardless of score

### Requirement 8: Conversation Practice

**User Story:** As a language learner, I want to have conversations in my target language, so that I can practice real-world communication.

#### Acceptance Criteria

1. WHEN in Chat mode, THE system SHALL respond in target language with English translations
2. THE system SHALL keep responses SHORT (maximum 2-3 sentences)
3. THE system SHALL ask ONE follow-up question to continue conversation
4. THE system SHALL provide tips for better phrasing when appropriate
5. THE system SHALL maintain conversational context across multiple messages

### Requirement 9: Grammar Correction

**User Story:** As a language learner, I want my grammar mistakes corrected, so that I can learn proper language structure.

#### Acceptance Criteria

1. WHEN in Grammar mode, THE system SHALL correct user's sentences
2. THE system SHALL show the corrected sentence in target language
3. THE system SHALL explain the grammar rule in 1-2 sentences
4. THE system SHALL provide ONE additional example of correct usage
5. THE system SHALL ask user to try writing another sentence

### Requirement 10: Translation Support

**User Story:** As a language learner, I want to translate phrases and see different versions, so that I can learn multiple ways to express ideas.

#### Acceptance Criteria

1. WHEN in Translate mode, THE system SHALL provide direct translation
2. THE system SHALL provide a simpler beginner-friendly version
3. THE system SHALL provide an advanced version for future learning
4. THE system SHALL include a grammar note explaining one key word or structure
5. THE system SHALL provide pronunciation guidance for the translation

### Requirement 11: Scenario Practice

**User Story:** As a language learner, I want to practice real-world scenarios (restaurant, airport, shopping), so that I can prepare for actual situations.

#### Acceptance Criteria

1. WHEN in Practice mode, THE system SHALL ask user to choose a scenario topic
2. THE system SHALL offer scenarios: Restaurant, Shopping, Airport, Doctor, Work
3. WHEN a scenario is selected, THE system SHALL role-play that scenario
4. THE system SHALL ask ONE question at a time in the scenario context
5. EVERY scenario dialogue SHALL include bilingual format with 📝 translations

### Requirement 12: Vocabulary Building

**User Story:** As a language learner, I want to track and review vocabulary words, so that I can expand my word knowledge.

#### Acceptance Criteria

1. WHEN in Vocab mode, THE system SHALL track words the user has learned
2. THE system SHALL provide word entries with: word, meaning, example sentence, pronunciation
3. WHEN user has learned 10+ words, THE system SHALL offer a review quiz
4. THE system SHALL identify words the user struggles with
5. THE system SHALL provide example sentences in target language with English translations
