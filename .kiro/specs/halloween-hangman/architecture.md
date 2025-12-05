# Halloween Hangman - Architecture Diagram

## Component Tree

```
App
└── Desktop
    └── Taskbar
        └── Start Menu
            └── 🎃 Halloween Hangman Button (Halloween theme only)
                ↓ (opens window)
                WindowManager
                └── DraggableWindow
                    └── HalloweenHangmanWindow
                        ├── Difficulty Selection Screen
                        │   ├── Beginner Button
                        │   ├── Intermediate Button
                        │   ├── Advanced Button
                        │   └── Stats Display
                        │
                        └── Game Playing Screen
                            ├── Header (Stats Bar)
                            ├── Game Grid (2 columns)
                            │   ├── Left: MonsterStage
                            │   │   ├── Monster Emojis (7 stages)
                            │   │   └── Wrong Guess Counter
                            │   │
                            │   └── Right: Word Display Area
                            │       ├── Word with Underscores
                            │       ├── Hint Display
                            │       ├── Wrong Letters List
                            │       └── Win/Loss Message
                            │
                            ├── LetterKeyboard
                            │   └── 26 Letter Buttons (A-Z)
                            │
                            └── Action Buttons
                                ├── New Word Button
                                └── Change Difficulty Button
```

## Data Flow

```
User Action
    ↓
Event Handler (onClick / onKeyDown)
    ↓
useHalloweenHangman Hook
    ↓
State Update (guessedLetters, wrongGuesses, etc.)
    ↓
Effect Triggers (win/loss detection)
    ↓
Component Re-render
    ↓
UI Updates (monster stage, word display, etc.)
```

## State Management

```
useHalloweenHangman Hook
├── State Variables
│   ├── difficulty: 'beginner' | 'intermediate' | 'advanced' | null
│   ├── currentWord: string (uppercase)
│   ├── currentHint: string
│   ├── guessedLetters: string[]
│   ├── wrongGuesses: number
│   ├── gameState: 'difficulty' | 'playing' | 'won' | 'lost'
│   ├── score: number
│   ├── streak: number
│   ├── totalGames: number
│   └── wins: number
│
├── Computed Values
│   ├── maxWrong: number (from difficulty config)
│   ├── displayWord: string (with underscores)
│   └── wrongLetters: string[]
│
└── Functions
    ├── startGame(difficulty)
    ├── guessLetter(letter)
    ├── restartGame()
    └── resetGame()
```

## File Dependencies

```
HalloweenHangmanWindow.jsx
├── imports useHalloweenHangman from hooks/useHalloweenHangman.js
├── imports MonsterStage from components/HalloweenHangman/MonsterStage.jsx
├── imports LetterKeyboard from components/HalloweenHangman/LetterKeyboard.jsx
└── imports DIFFICULTY_LEVELS from data/halloweenWords.js

useHalloweenHangman.js
├── imports HALLOWEEN_WORDS from data/halloweenWords.js
└── imports DIFFICULTY_LEVELS from data/halloweenWords.js

WindowManager.jsx
└── imports HalloweenHangmanWindow from Windows/HalloweenHangmanWindow.jsx

Taskbar.jsx
├── imports Ghost icon from lucide-react
└── calls openWindow({ type: 'halloweenHangman', ... })
```

## Game Loop

```
1. INITIALIZATION
   User clicks "🎃 Halloween Hangman" in Start menu
   → openWindow({ type: 'halloweenHangman' })
   → WindowManager renders HalloweenHangmanWindow
   → gameState = 'difficulty'
   → Show difficulty selection screen

2. GAME START
   User clicks difficulty button
   → startGame(difficulty)
   → Select random word from HALLOWEEN_WORDS[difficulty]
   → Initialize state (guessedLetters = [], wrongGuesses = 0)
   → gameState = 'playing'
   → Show game playing screen

3. GAMEPLAY LOOP
   User guesses letter (click or keyboard)
   → guessLetter(letter)
   → Check if letter already guessed (ignore if yes)
   → Check if letter in word
      ├── YES: Add to guessedLetters
      └── NO: Add to guessedLetters + wrongGuesses++
   → useEffect detects state change
   → Check win/loss conditions
      ├── All letters guessed → gameState = 'won'
      ├── wrongGuesses >= maxWrong → gameState = 'lost'
      └── Otherwise → continue loop

4. GAME END
   Win or Loss detected
   → Calculate score
      ├── Base points (10/15/25)
      ├── + Streak bonus (streak * 5)
      ├── + Perfect bonus (wrongGuesses === 0 ? 20 : 0)
      └── - Wrong guess penalty (wrongGuesses * 1)
   → Update stats (totalGames++, wins++, streak++)
   → Show win/loss message
   → Enable action buttons

5. RESTART OPTIONS
   User clicks "New Word"
   → restartGame()
   → Go to step 2 (same difficulty)
   
   User clicks "Change Difficulty"
   → resetGame()
   → Go to step 1 (difficulty selection)
```

## Event Flow

```
KEYBOARD INPUT
window.addEventListener('keydown')
    ↓
Check if gameState === 'playing'
    ↓
Extract key.toUpperCase()
    ↓
Validate /^[A-Z]$/
    ↓
guessLetter(key)

MOUSE INPUT
onClick handler on letter button
    ↓
Check if disabled (already guessed or game over)
    ↓
guessLetter(letter)

BOTH PATHS CONVERGE
guessLetter(letter)
    ↓
Check if already in guessedLetters
    ↓
Add to guessedLetters
    ↓
Check if letter in currentWord
    ├── YES: Reveal in displayWord
    └── NO: wrongGuesses++
    ↓
useEffect triggers win/loss check
```

## Styling Architecture

```
THEME COLORS
├── Primary: #ff6b35, #ff8c42 (Orange)
├── Secondary: #2d1b4e, #1a0f2e (Purple)
├── Accent: #ffaa00 (Yellow)
├── Success: #00d4aa (Green)
└── Error: #ff4444 (Red)

LAYOUT STRUCTURE
├── Difficulty Screen
│   └── Vertical flexbox, centered
│
└── Game Screen
    ├── Header (Stats bar)
    ├── Grid (2 columns)
    │   ├── Left: Monster stage
    │   └── Right: Word display
    ├── Keyboard (7-column grid)
    └── Buttons (Horizontal flex)

ANIMATIONS
├── @keyframes float (Monster emojis)
├── @keyframes pulse (Game over background)
├── @keyframes shake (Loss message)
└── @keyframes bounce (Win message)

EFFECTS
├── Gradient backgrounds
├── Box shadows with glow
├── Text shadows
├── Transform on hover
└── Transition on all interactions
```

## Integration Points

```
WINDOW SYSTEM
WindowContext
├── openWindow({ type: 'halloweenHangman', ... })
├── closeWindow(windowId)
├── focusWindow(windowId)
└── minimizeWindow(windowId)

THEME SYSTEM
ThemeContext
├── theme.isHalloween → Show/hide game button
└── theme.accent → Use for styling

TASKBAR
Start Menu
└── Conditional rendering based on theme.isHalloween
```

## Performance Considerations

```
OPTIMIZATIONS
├── useCallback for memoized functions
│   ├── startGame
│   ├── guessLetter
│   ├── getDisplayWord
│   ├── getWrongLetters
│   ├── restartGame
│   └── resetGame
│
├── Efficient state updates
│   └── Minimal re-renders with proper dependencies
│
├── No external libraries
│   └── Pure React (no lodash, moment, etc.)
│
└── CSS-in-JS
    └── No separate CSS files to load
```

## Error Handling

```
INPUT VALIDATION
├── Check if letter already guessed → Ignore
├── Check if game is active → Ignore if not
├── Validate keyboard input → Only A-Z
└── Check if window is focused → Event listener cleanup

STATE VALIDATION
├── Ensure currentWord exists before operations
├── Validate difficulty before starting game
├── Check maxWrong from config
└── Handle edge cases (empty word list, etc.)

EDGE CASES
├── Rapid clicking → Disabled state prevents duplicates
├── Keyboard spam → Already guessed check
├── Window close during game → State cleanup
└── Theme switch → Game remains functional
```

## Testing Strategy

```
UNIT TESTS (Potential)
├── useHalloweenHangman hook
│   ├── startGame() selects random word
│   ├── guessLetter() updates state correctly
│   ├── Win detection works
│   ├── Loss detection works
│   └── Score calculation is accurate
│
├── MonsterStage component
│   ├── Renders correct number of stages
│   ├── Shows stages based on wrongGuesses
│   └── Animations work
│
└── LetterKeyboard component
    ├── Renders 26 letters
    ├── Disables guessed letters
    └── Calls onClick handler

INTEGRATION TESTS (Potential)
├── Window opens from Start menu
├── Difficulty selection works
├── Full game playthrough (win)
├── Full game playthrough (loss)
└── Restart and reset work

MANUAL TESTS (Current)
├── Visual inspection
├── Interaction testing
├── Edge case testing
└── Cross-browser testing
```

## Scalability

```
EASY TO EXTEND
├── Add new difficulty level
│   └── Add to DIFFICULTY_LEVELS in halloweenWords.js
│
├── Add more words
│   └── Add to HALLOWEEN_WORDS arrays
│
├── Change scoring rules
│   └── Modify score calculation in useHalloweenHangman
│
├── Add new monster stages
│   └── Add to stages array in MonsterStage.jsx
│
└── Add sound effects
    └── Add audio elements and play on events
```

## Summary

The Halloween Hangman game follows a clean, modular architecture with:

- **Separation of concerns**: Logic (hook), UI (components), Data (word bank)
- **Reusable components**: MonsterStage, LetterKeyboard
- **Efficient state management**: Custom hook with useCallback
- **Theme integration**: Conditional rendering based on theme
- **Window system integration**: Standard window type registration
- **Performance optimized**: Minimal re-renders, no external deps
- **Extensible design**: Easy to add features and content

The architecture supports future enhancements while maintaining code quality and performance.
