# Requirements Document

## Introduction

The Word Scramble Challenge is a retro-styled English vocabulary game integrated into the Lingo language learning application. The game provides an engaging way for learners to build vocabulary, improve spelling, and learn word meanings through timed word unscrambling challenges across three difficulty levels.

## Glossary

- **Game System**: The Word Scramble Challenge mini-application
- **Player**: A user interacting with the Word Scramble game
- **Scrambled Word**: An English word with its letters randomly rearranged
- **Word Bank**: The collection of words, categorized by difficulty level and theme
- **Game Session**: A single playthrough from start to end screen
- **Streak**: Consecutive correct answers without mistakes
- **Level**: Difficulty tier (Beginner, Intermediate, or Advanced)

## Requirements

### Requirement 1

**User Story:** As a language learner, I want to access the Word Scramble game from the desktop interface, so that I can practice vocabulary in an engaging way.

#### Acceptance Criteria

1. WHEN a player clicks a "Games" button in the Start menu or taskbar THEN the Game System SHALL display a games menu with Word Scramble as an option
2. WHEN a player selects Word Scramble from the games menu THEN the Game System SHALL open a new draggable window with retro styling consistent with the Lingo application
3. WHEN the Word Scramble window opens THEN the Game System SHALL display a level selection screen with Beginner, Intermediate, and Advanced options
4. WHEN a player closes the Word Scramble window THEN the Game System SHALL terminate the current game session and return to the desktop

### Requirement 2

**User Story:** As a language learner, I want to see scrambled words with helpful hints, so that I can successfully unscramble them and learn their meanings.

#### Acceptance Criteria

1. WHEN a game session starts THEN the Game System SHALL display a scrambled word from the selected difficulty level
2. WHEN displaying a scrambled word THEN the Game System SHALL show the category hint (e.g., "Furniture", "Food", "Verbs")
3. WHEN a player clicks "Give me a letter" THEN the Game System SHALL reveal one correct letter in its proper position and deduct 2 points from the potential score
4. WHEN a scrambled word is generated THEN the Game System SHALL ensure the scrambled version differs from the original word
5. WHEN a player provides a correct answer THEN the Game System SHALL display the word's meaning and an example sentence

### Requirement 3

**User Story:** As a language learner, I want to submit my answers and receive immediate feedback, so that I know if I unscrambled the word correctly.

#### Acceptance Criteria

1. WHEN a player types an answer and clicks "Check" THEN the Game System SHALL validate the answer case-insensitively against the correct word
2. WHEN a player submits a correct answer on the first attempt THEN the Game System SHALL award 10 points and display a success message with the word's meaning
3. WHEN a player submits an incorrect answer THEN the Game System SHALL display an error message with a hint and allow the player to retry
4. WHEN a player submits a correct answer after one wrong attempt THEN the Game System SHALL award 7 points
5. WHEN a player submits a correct answer after two or more wrong attempts THEN the Game System SHALL award 5 points
6. WHEN a correct answer is validated THEN the Game System SHALL automatically advance to the next word after 1.5 to 2 seconds

### Requirement 4

**User Story:** As a language learner, I want to skip difficult words, so that I can maintain momentum and complete more words within the time limit.

#### Acceptance Criteria

1. WHEN a player clicks the "Skip" button THEN the Game System SHALL advance to the next word without awarding points
2. WHEN a word is skipped THEN the Game System SHALL reset any accumulated wrong attempts for the next word
3. WHEN a player skips a word THEN the Game System SHALL not break the current streak

### Requirement 5

**User Story:** As a language learner, I want to see my score, streak, and remaining time, so that I can track my performance during the game.

#### Acceptance Criteria

1. WHEN a game session is active THEN the Game System SHALL display the current score updated in real-time
2. WHEN a player answers correctly multiple times in a row THEN the Game System SHALL display the current streak count
3. WHEN a player answers incorrectly or skips a word THEN the Game System SHALL reset the streak counter to zero
4. WHEN every 5 correct answers occur in a row THEN the Game System SHALL award a 10-point streak bonus
5. WHEN a game session is active THEN the Game System SHALL display a countdown timer showing remaining seconds
6. WHEN the timer reaches zero THEN the Game System SHALL end the game session and display the summary screen

### Requirement 6

**User Story:** As a language learner, I want to choose between difficulty levels, so that I can practice vocabulary appropriate to my skill level.

#### Acceptance Criteria

1. WHEN Beginner level is selected THEN the Game System SHALL present 3-5 letter common nouns from categories like food, house, school, and animals with a 90-second timer
2. WHEN Intermediate level is selected THEN the Game System SHALL present 5-7 letter verbs and adjectives related to daily actions and feelings with a 120-second timer
3. WHEN Advanced level is selected THEN the Game System SHALL present 6-8 letter abstract words representing ideas and concepts with a 150-second timer
4. WHEN a level is selected THEN the Game System SHALL display the level name in the header bar throughout the game session

### Requirement 7

**User Story:** As a language learner, I want to see a summary of my performance at the end of the game, so that I can understand how well I did and learn from missed words.

#### Acceptance Criteria

1. WHEN a game session ends THEN the Game System SHALL display a summary screen showing total score, words solved, and words missed
2. WHEN the summary screen displays missed words THEN the Game System SHALL show each missed word with its correct spelling, meaning, and example sentence
3. WHEN the summary screen is displayed THEN the Game System SHALL provide a "Play Again" button
4. WHEN a player clicks "Play Again" THEN the Game System SHALL return to the level selection screen

### Requirement 8

**User Story:** As a language learner, I want the game interface to be visually consistent with the Lingo app's retro aesthetic, so that the experience feels cohesive.

#### Acceptance Criteria

1. WHEN the Word Scramble window is displayed THEN the Game System SHALL use the same window styling as other Lingo windows with title bar, close, and minimize buttons
2. WHEN displaying game elements THEN the Game System SHALL use retro-styled fonts, colors, and UI components consistent with the Yahoo Chat aesthetic
3. WHEN feedback messages appear THEN the Game System SHALL use visual indicators (✅ for correct, ❌ for incorrect) with appropriate color coding
4. WHEN the game is active THEN the Game System SHALL maintain the selected theme's color scheme from the main Lingo application

### Requirement 9

**User Story:** As a language learner, I want the game to include a comprehensive word bank, so that I have varied vocabulary practice across multiple sessions.

#### Acceptance Criteria

1. WHEN the Word Bank is initialized THEN the Game System SHALL include at least 15 beginner words across categories (Home & Objects, Food, People & Basic Nouns)
2. WHEN the Word Bank is initialized THEN the Game System SHALL include at least 15 intermediate words across categories (Common Verbs, Adjectives, Daily Life)
3. WHEN the Word Bank is initialized THEN the Game System SHALL include at least 15 advanced words across categories (Abstract/Concepts, More Challenging)
4. WHEN a word is selected from the Word Bank THEN the Game System SHALL include the word, level, category, hint, meaning, and example sentence
5. WHEN words are presented during a game session THEN the Game System SHALL randomize the order to ensure variety across multiple playthroughs
