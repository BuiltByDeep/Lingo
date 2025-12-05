# Word Scramble Game - Design Document

## Overview

The Word Scramble Challenge is a vocabulary-building mini-game integrated into the Lingo language learning application. It provides an engaging, time-based challenge where players unscramble English words across three difficulty levels. The game follows the existing Lingo application's retro aesthetic and window management system, appearing as a draggable window on the desktop.

The game emphasizes immediate feedback, progressive difficulty, and educational value by displaying word meanings and example sentences. It uses a scoring system with streak bonuses to encourage sustained performance and includes helpful hints to support learners at all levels.

## Architecture

### Component Structure

```
Desktop (existing)
└── WindowManager (existing)
    └── WordScrambleWindow (new)
        ├── LevelSelectionScreen
        ├── GamePlayScreen
        │   ├── GameHeader
        │   ├── WordDisplay
        │   ├── InputArea
        │   └── GameSidebar
        └── SummaryScreen
```

### State Management

The Word Scramble game will use React's built-in state management (useState, useEffect) for game-specific state. It will integrate with the existing WindowContext for window lifecycle management (open, close, minimize, focus).

**Key State Variables:**
- `gameState`: 'level-select' | 'playing' | 'summary'
- `selectedLevel`: 'beginner' | 'intermediate' | 'advanced' | null
- `currentWordIndex`: number
- `score`: number
- `streak`: number
- `timeRemaining`: number
- `currentWord`: WordItem object
- `scrambledWord`: string
- `userInput`: string
- `attemptCount`: number
- `revealedLetters`: number[]
- `solvedWords`: WordItem[]
- `missedWords`: WordItem[]
- `feedbackMessage`: { type: 'success' | 'error' | 'hint', text: string } | null

### Data Models

#### WordItem

```typescript
interface WordItem {
  word: string;              // Original word in uppercase
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;          // e.g., "Furniture", "Food", "Verbs"
  hint: string;              // Short hint text
  meaning: string;           // Simple English definition
  example: string;           // Example sentence using the word
}
```

#### GameConfig

```typescript
interface GameConfig {
  level: 'beginner' | 'intermediate' | 'advanced';
  timeLimit: number;         // Seconds
  targetWordCount: number;   // Suggested goal
  wordLength: string;        // Display text like "3-5 letters"
}
```

#### GameStats

```typescript
interface GameStats {
  score: number;
  wordsAttempted: number;
  wordsSolved: number;
  wordsSkipped: number;
  longestStreak: number;
  solvedWords: WordItem[];
  missedWords: WordItem[];
}
```

## Components and Interfaces

### WordScrambleWindow

**Purpose:** Main container component that manages game state and renders appropriate screens.

**Props:**
- `windowId`: string (from WindowContext)
- `onClose`: () => void (from WindowContext)

**State:**
- All game state variables listed above

**Key Methods:**
- `handleLevelSelect(level)`: Initialize game with selected difficulty
- `startGame()`: Begin countdown timer and load first word
- `handleSubmit()`: Validate user answer
- `handleSkip()`: Move to next word without scoring
- `handleRevealLetter()`: Show one correct letter
- `endGame()`: Stop timer and show summary
- `resetGame()`: Return to level selection

### LevelSelectionScreen

**Purpose:** Display difficulty level options before game starts.

**Props:**
- `onSelectLevel`: (level: string) => void

**UI Elements:**
- Three large buttons: Beginner, Intermediate, Advanced
- Each button shows: level name, word length range, time limit, target word count
- Retro-styled with hover effects

### GamePlayScreen

**Purpose:** Main game interface during active play.

**Props:**
- `currentWord`: WordItem
- `scrambledWord`: string
- `score`: number
- `streak`: number
- `timeRemaining`: number
- `userInput`: string
- `feedbackMessage`: object | null
- `revealedLetters`: number[]
- `onInputChange`: (value: string) => void
- `onSubmit`: () => void
- `onSkip`: () => void
- `onRevealLetter`: () => void

**Sub-components:**

#### GameHeader
- Displays: "Word Scramble Challenge"
- Shows current level badge
- Window controls (minimize, close)

#### WordDisplay
- Large scrambled word with revealed letters highlighted
- Category hint always visible
- "Give me a letter" button (shows cost: -2 points)

#### InputArea
- Text input field with placeholder "Type your answer..."
- "Check" button (primary action)
- "Skip" button (secondary action)
- Feedback message area below input

#### GameSidebar
- Score display with icon
- Streak counter with fire emoji (🔥) when active
- Countdown timer with warning color when < 10 seconds
- Progress indicator (words solved / total attempted)

### SummaryScreen

**Purpose:** Display game results and allow replay.

**Props:**
- `stats`: GameStats
- `onPlayAgain`: () => void
- `onClose`: () => void

**UI Elements:**
- Large score display
- Statistics: words solved, words missed, longest streak
- Expandable list of missed words with meanings and examples
- "Play Again" button (returns to level selection)
- "Close" button (closes window)

## Word Bank Service

### WordBankService

**Purpose:** Manage word data and provide filtered word lists.

**Methods:**

```typescript
class WordBankService {
  private wordBank: WordItem[];
  
  constructor() {
    this.wordBank = WORD_BANK_DATA;
  }
  
  getWordsByLevel(level: string): WordItem[] {
    // Returns shuffled array of words for specified level
  }
  
  scrambleWord(word: string): string {
    // Fisher-Yates shuffle ensuring result differs from original
  }
  
  validateAnswer(userInput: string, correctWord: string): boolean {
    // Case-insensitive comparison
  }
}
```

### Word Bank Data

The word bank will be stored as a constant array in a separate file (`wordBankData.js`). It includes:

- **Beginner (15+ words):** 3-5 letter common nouns
  - Categories: Home & Objects, Food, People & Basic Nouns
  - Examples: TABLE, CHAIR, ROOM, DOOR, BED, CUP, BOOK, CLOCK, RICE, BREAD, APPLE, EGGS, GIRL, BOY, FAMILY, SCHOOL

- **Intermediate (15+ words):** 5-7 letter verbs and adjectives
  - Categories: Common Verbs, Adjectives, Daily Life
  - Examples: STUDY, LISTEN, DECIDE, TRAVEL, REMEMBER, PRACTICE, HAPPY, BORING, DANGEROUS, DIFFERENT, POPULAR, TICKET, WINDOW, MARKET

- **Advanced (15+ words):** 6-8 letter abstract words
  - Categories: Abstract/Concepts, More Challenging
  - Examples: CULTURE, FREEDOM, PATIENCE, OPINION, DECISION, EDUCATION, CONFIDENCE, MEMORY, LANGUAGE, EXAMPLE, SENTENCE, PRONOUNCE, PROGRESS

## Game Logic

### Scrambling Algorithm

```javascript
function scrambleWord(word) {
  const letters = word.split('');
  
  // Fisher-Yates shuffle
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  
  const scrambled = letters.join('');
  
  // Ensure scrambled differs from original
  return scrambled === word ? scrambleWord(word) : scrambled;
}
```

### Scoring System

```javascript
function calculateScore(attemptCount, usedHint) {
  let points = 0;
  
  if (attemptCount === 1) {
    points = 10;  // First try
  } else if (attemptCount === 2) {
    points = 7;   // Second try
  } else {
    points = 5;   // Third+ try
  }
  
  if (usedHint) {
    points -= 2;  // Hint penalty
  }
  
  return Math.max(0, points);  // Never negative
}

function checkStreakBonus(streak) {
  if (streak > 0 && streak % 5 === 0) {
    return 10;  // Bonus every 5 in a row
  }
  return 0;
}
```

### Timer Management

```javascript
useEffect(() => {
  if (gameState === 'playing' && timeRemaining > 0) {
    const timerId = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerId);
  }
}, [gameState, timeRemaining]);
```

### Letter Reveal Logic

```javascript
function revealRandomLetter(word, scrambledWord, revealedIndices) {
  const unrevealedIndices = [];
  
  for (let i = 0; i < word.length; i++) {
    if (!revealedIndices.includes(i)) {
      unrevealedIndices.push(i);
    }
  }
  
  if (unrevealedIndices.length === 0) return revealedIndices;
  
  const randomIndex = unrevealedIndices[
    Math.floor(Math.random() * unrevealedIndices.length)
  ];
  
  return [...revealedIndices, randomIndex];
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Scrambled words differ from original

*For any* word in the word bank, when the scrambling algorithm is applied, the resulting scrambled word must be different from the original word.

**Validates: Requirements 2.4**

### Property 2: Category hints always displayed

*For any* word displayed during gameplay, the category hint must be visible in the UI alongside the scrambled word.

**Validates: Requirements 2.2**

### Property 3: Letter reveal correctness

*For any* word, when the "Give me a letter" hint is used, exactly one previously unrevealed letter from the correct word must be revealed in its proper position, and the potential score must be reduced by 2 points.

**Validates: Requirements 2.3**

### Property 4: Case-insensitive validation

*For any* word and any case variation of that word (uppercase, lowercase, mixed case), the validation function must return true when comparing the user input to the correct answer.

**Validates: Requirements 3.1**

### Property 5: First attempt scoring

*For any* word, when a player submits the correct answer on the first attempt without using hints, the score must increase by exactly 10 points.

**Validates: Requirements 3.2**

### Property 6: Second attempt scoring

*For any* word, when a player submits the correct answer on the second attempt, the score must increase by exactly 7 points (minus any hint penalties).

**Validates: Requirements 3.4**

### Property 7: Third+ attempt scoring

*For any* word, when a player submits the correct answer after two or more wrong attempts, the score must increase by exactly 5 points (minus any hint penalties).

**Validates: Requirements 3.5**

### Property 8: Skip preserves score

*For any* game state, when a player skips a word, the score must remain unchanged.

**Validates: Requirements 4.1**

### Property 9: Skip resets attempts

*For any* word sequence, when a player skips a word after making wrong attempts, the attempt counter for the next word must start at zero.

**Validates: Requirements 4.2**

### Property 10: Skip preserves streak

*For any* game state with an active streak, when a player skips a word, the streak counter must remain unchanged.

**Validates: Requirements 4.3**

### Property 11: Incorrect answer resets streak

*For any* game state with an active streak, when a player submits an incorrect answer, the streak counter must reset to zero.

**Validates: Requirements 5.3**

### Property 12: Streak bonus at multiples of 5

*For any* game state, when a player achieves exactly 5, 10, 15, or any multiple of 5 correct answers in a row, a 10-point bonus must be awarded.

**Validates: Requirements 5.4**

### Property 13: Correct answer shows meaning and example

*For any* word, when a player provides the correct answer, the UI must display both the word's meaning and an example sentence.

**Validates: Requirements 2.5**

### Property 14: Level name persistence

*For any* selected difficulty level, the level name must be displayed in the header bar throughout the entire game session until the game ends.

**Validates: Requirements 6.4**

### Property 15: Summary screen completeness

*For any* completed game session, the summary screen must display the total score, count of words solved, and count of words missed.

**Validates: Requirements 7.1**

### Property 16: Missed words detail

*For any* word that was missed or skipped during a game session, the summary screen must display the word's correct spelling, meaning, and example sentence.

**Validates: Requirements 7.2**

### Property 17: Feedback indicators

*For any* feedback message, correct answers must display ✅ and incorrect answers must display ❌.

**Validates: Requirements 8.3**

### Property 18: Word bank completeness

*For any* word in the word bank, the word object must contain non-empty values for all required fields: word, level, category, hint, meaning, and example.

**Validates: Requirements 9.4**

### Property 19: Word order randomization

*For any* two consecutive game sessions at the same difficulty level, the order of words presented must differ (with high probability for word banks larger than 10 words).

**Validates: Requirements 9.5**

## Error Handling

### Input Validation

- **Empty Input:** If user submits empty string, display message "Please type an answer first" without counting as wrong attempt
- **Whitespace Only:** Trim input before validation; treat whitespace-only as empty
- **Special Characters:** Accept only alphabetic characters; ignore numbers and symbols

### Timer Edge Cases

- **Timer Reaches Zero During Input:** Immediately end game, do not process current answer
- **Timer Manipulation:** Use `setInterval` with cleanup to prevent memory leaks
- **Negative Time:** Clamp timer display to minimum of 0 seconds

### Word Bank Errors

- **Empty Word Bank:** If no words available for selected level, display error message and return to level selection
- **Insufficient Words:** If fewer than 5 words available, display warning but allow gameplay
- **Missing Word Data:** Skip words with incomplete data (missing meaning, example, etc.)

### Window Management

- **Window Close During Game:** Save game state to allow resume (optional future enhancement)
- **Multiple Instances:** Prevent opening multiple Word Scramble windows simultaneously
- **Focus Loss:** Pause timer when window loses focus (optional)

### Network/Storage Errors

- **Word Bank Load Failure:** Display friendly error message with retry option
- **State Persistence Failure:** Continue with in-memory state only, log error

## Testing Strategy

### Unit Testing

The Word Scramble game will use **Vitest** as the testing framework (consistent with the Lingo app's existing setup).

**Unit Test Coverage:**

1. **Scrambling Algorithm**
   - Test that scrambled word differs from original
   - Test with short words (3 letters)
   - Test with long words (8+ letters)
   - Test edge case: single letter (should return same)

2. **Scoring Functions**
   - Test first attempt scoring (10 points)
   - Test second attempt scoring (7 points)
   - Test third+ attempt scoring (5 points)
   - Test hint penalty (-2 points)
   - Test streak bonus (every 5 correct)

3. **Validation Logic**
   - Test case-insensitive matching
   - Test with various case combinations
   - Test with whitespace trimming
   - Test with empty input

4. **Letter Reveal**
   - Test that revealed letter is from correct word
   - Test that same letter not revealed twice
   - Test with all letters revealed

5. **Word Bank Service**
   - Test filtering by level
   - Test word bank initialization
   - Test word data completeness

### Property-Based Testing

The Word Scramble game will use **fast-check** library for property-based testing.

**Configuration:**
- Minimum 100 iterations per property test
- Use custom generators for word data
- Seed random generator for reproducibility

**Property Test Coverage:**

Each correctness property listed above will be implemented as a property-based test. Tests will be tagged with comments in the format:

```javascript
// Feature: word-scramble-game, Property 1: Scrambled words differ from original
```

**Custom Generators:**

```javascript
// Generate random WordItem objects
const wordItemArbitrary = fc.record({
  word: fc.stringOf(fc.char().filter(c => /[A-Z]/.test(c)), { minLength: 3, maxLength: 8 }),
  level: fc.constantFrom('beginner', 'intermediate', 'advanced'),
  category: fc.constantFrom('Food', 'Furniture', 'Verbs', 'Adjectives'),
  hint: fc.string({ minLength: 5 }),
  meaning: fc.string({ minLength: 10 }),
  example: fc.string({ minLength: 15 })
});

// Generate random game states
const gameStateArbitrary = fc.record({
  score: fc.nat(1000),
  streak: fc.nat(20),
  attemptCount: fc.integer({ min: 0, max: 5 }),
  timeRemaining: fc.nat(200)
});
```

### Integration Testing

**Component Integration:**
- Test WordScrambleWindow with all sub-screens
- Test level selection → gameplay → summary flow
- Test window open/close via WindowContext
- Test timer countdown and game end

**User Flow Testing:**
- Complete game session from start to finish
- Test skip functionality mid-game
- Test hint usage and scoring impact
- Test streak building and breaking

### Manual Testing Checklist

- [ ] Open game from Start menu
- [ ] Select each difficulty level
- [ ] Complete a full game session
- [ ] Test skip button
- [ ] Test hint button
- [ ] Build a 5+ streak for bonus
- [ ] Let timer run to zero
- [ ] Test "Play Again" functionality
- [ ] Test window minimize/restore
- [ ] Test window close during gameplay
- [ ] Verify retro styling consistency
- [ ] Test with different themes

## UI/UX Specifications

### Color Scheme

**Success States:**
- Correct answer background: `#d4edda` (light green)
- Correct answer text: `#155724` (dark green)
- Success icon: ✅

**Error States:**
- Incorrect answer background: `#f8d7da` (light red)
- Incorrect answer text: `#721c24` (dark red)
- Error icon: ❌

**Neutral States:**
- Hint background: `#fff3cd` (light yellow)
- Hint text: `#856404` (dark yellow)
- Info icon: 💡

**Timer Warning:**
- Normal: `#333` (dark gray)
- Warning (< 10s): `#dc3545` (red)
- Critical (< 5s): Pulsing animation

### Typography

- **Game Title:** 24px, bold, retro font
- **Scrambled Word:** 48px, bold, monospace
- **Category Hint:** 16px, italic
- **Score/Streak:** 20px, bold
- **Timer:** 24px, bold
- **Feedback Messages:** 14px, regular
- **Buttons:** 16px, bold

### Spacing and Layout

- **Window Size:** 600px width × 500px height (resizable)
- **Padding:** 20px around main content
- **Button Spacing:** 10px between buttons
- **Section Spacing:** 30px between major sections

### Animations

- **Correct Answer:** Fade in green background, scale up word (0.3s)
- **Incorrect Answer:** Shake animation (0.5s)
- **Timer Warning:** Pulse animation when < 10 seconds
- **Streak Bonus:** Confetti or sparkle effect
- **Screen Transitions:** Fade in/out (0.2s)

### Accessibility

- **Keyboard Navigation:** Tab through buttons, Enter to submit
- **Focus Indicators:** Clear outline on focused elements
- **Color Contrast:** WCAG AA compliant
- **Screen Reader:** ARIA labels on interactive elements
- **Font Size:** Minimum 14px for body text

## Integration Points

### WindowContext Integration

```javascript
// Opening the game
const { openWindow } = useWindows();

openWindow({
  id: 'word-scramble',
  type: 'word-scramble',
  title: 'Word Scramble Challenge',
  component: WordScrambleWindow,
  defaultSize: { width: 600, height: 500 },
  defaultPosition: { x: 100, y: 100 }
});
```

### Start Menu Integration

Add new menu item to Desktop component's Start menu:

```javascript
{
  label: 'Games',
  icon: '🎮',
  submenu: [
    {
      label: 'Word Scramble Challenge',
      icon: '🔤',
      action: () => openWindow({ type: 'word-scramble', ... })
    }
  ]
}
```

### Theme Integration

The game will respect the current theme from ThemeContext:

```javascript
const { theme } = useTheme();

// Apply theme-specific colors to game elements
const gameStyles = {
  backgroundColor: theme.windowBackground,
  color: theme.textColor,
  borderColor: theme.borderColor
};
```

## Performance Considerations

### Optimization Strategies

1. **Word Bank Loading:** Load word bank once on component mount, cache in state
2. **Scrambling:** Pre-scramble all words for session to avoid computation during gameplay
3. **Timer Updates:** Use single interval, avoid multiple timers
4. **Re-renders:** Memoize expensive computations with `useMemo`
5. **Event Handlers:** Use `useCallback` for stable function references

### Memory Management

- Clear timer intervals on component unmount
- Limit message history to prevent memory growth
- Clean up event listeners properly

### Bundle Size

- Word bank data: ~5-10KB (acceptable for inline data)
- No additional dependencies beyond existing Lingo app libraries
- Component code: ~15-20KB estimated

## Future Enhancements

### Potential Features (Out of Scope for MVP)

1. **Multiplayer Mode:** Compete with other players in real-time
2. **Daily Challenges:** Special word sets that change daily
3. **Leaderboards:** Track high scores across users
4. **Custom Word Lists:** Allow teachers to create custom word banks
5. **Difficulty Progression:** Automatically increase difficulty based on performance
6. **Sound Effects:** Audio feedback for correct/incorrect answers
7. **Achievements:** Unlock badges for milestones
8. **Language Support:** Extend to other languages beyond English
9. **Timed Challenges:** Speed rounds with shorter time limits
10. **Word Categories:** Let players choose specific categories (food only, verbs only, etc.)

## Implementation Notes

### File Structure

```
lingo-app/src/
├── components/
│   └── Windows/
│       └── WordScrambleWindow.jsx       (main component)
├── services/
│   └── wordBankService.js               (word management)
├── data/
│   └── wordBankData.js                  (word bank constant)
└── __tests__/
    └── wordScramble.test.js             (unit tests)
    └── wordScramble.property.test.js    (property tests)
```

### Development Approach

1. **Phase 1:** Build core game logic (scrambling, scoring, validation)
2. **Phase 2:** Create UI components (screens, buttons, displays)
3. **Phase 3:** Integrate with WindowContext and Start menu
4. **Phase 4:** Add timer and game flow logic
5. **Phase 5:** Implement summary screen and replay
6. **Phase 6:** Write unit tests
7. **Phase 7:** Write property-based tests
8. **Phase 8:** Polish UI and add animations
9. **Phase 9:** Manual testing and bug fixes

### Dependencies

**No new dependencies required.** The game will use:
- React (existing)
- Existing Lingo UI components (DraggableWindow)
- Existing context providers (WindowContext, ThemeContext)
- Vitest (existing, for unit tests)
- fast-check (to be added, for property tests)

### Browser Compatibility

- **Target:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Minimum:** ES6+ support required
- **No special APIs:** Uses only standard React and DOM APIs
