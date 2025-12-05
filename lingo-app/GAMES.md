# 🎮 Lingo Games

Lingo includes fun, educational games to enhance language learning through interactive play.

## Available Games

### 1. Word Scramble Challenge 🔤

A fast-paced word unscrambling game with multiple difficulty levels.

**Features:**
- 3 difficulty levels (Easy, Medium, Hard)
- Timed challenges
- Hint system
- Score tracking
- Streak bonuses

**How to Access:**
- Click **Start** → **Word Scramble Game**
- Available in all themes

**Documentation:** See Word Scramble components in `src/components/WordScramble/`

---

### 2. Halloween Hangman 🎃

A spooky twist on classic Hangman, available only in Halloween theme!

**Features:**
- 3 difficulty levels (Beginner, Intermediate, Advanced)
- Halloween-themed vocabulary
- Progressive monster stages
- Hint system
- Score tracking with bonuses
- Full keyboard support

**How to Access:**
1. Switch to **Halloween theme** (Palette icon in taskbar)
2. Click **Start** → **🎃 Halloween Hangman**

**Difficulty Levels:**
- 🟢 **Beginner**: Simple words (bat, cat, ghost) - 7 wrong guesses allowed
- 🟠 **Intermediate**: Moderate words (pumpkin, vampire) - 6 wrong guesses allowed
- 🟣 **Advanced**: Complex words (supernatural, incantation) - 5 wrong guesses allowed

**Scoring:**
- Base points: 10/15/25 (by difficulty)
- Streak bonus: +5 per consecutive win
- Perfect round: +20 bonus (0 wrong guesses)
- Wrong guess penalty: -1 per wrong letter

**Documentation:** See `HALLOWEEN_HANGMAN.md` for complete guide

---

## Game Design Philosophy

All Lingo games are designed with these principles:

### 🎓 Educational Value
- Reinforce vocabulary and spelling
- Build pattern recognition skills
- Encourage critical thinking
- Support language learning goals

### 🎨 Retro Aesthetic
- Nostalgic early-2000s design
- Theme-appropriate styling
- Consistent with app's visual identity
- Fun and engaging interfaces

### ⚡ Performance
- Pure frontend logic (no backend required)
- Instant response times
- Smooth animations
- Efficient state management

### ♿ Accessibility
- Keyboard navigation support
- Clear visual feedback
- High contrast text
- Intuitive controls

### 🎯 Engagement
- Score tracking and statistics
- Streak bonuses for motivation
- Multiple difficulty levels
- Hint systems for support

---

## Technical Architecture

### Component Structure
```
src/
├── components/
│   ├── WordScramble/          # Word Scramble game components
│   ├── HalloweenHangman/      # Halloween Hangman components
│   └── Windows/               # Game window wrappers
├── hooks/
│   ├── useWordScrambleGame.js # Word Scramble logic
│   └── useHalloweenHangman.js # Halloween Hangman logic
└── data/
    ├── wordBankData.js        # Word Scramble word bank
    └── halloweenWords.js      # Halloween Hangman word bank
```

### State Management
- Custom React hooks for game logic
- Local component state for UI
- WindowContext for window management
- ThemeContext for theme-specific features

### Integration
- Games open as draggable windows
- Accessible from Start menu
- Theme-aware (Halloween Hangman)
- Consistent with app architecture

---

## Future Game Ideas

### 🎯 Potential Additions
- **Vocabulary Quiz**: Multiple choice language questions
- **Speed Typing**: Type sentences in target language
- **Memory Match**: Match words with translations
- **Crossword Puzzle**: Language-themed crosswords
- **Trivia Challenge**: Cultural and language trivia

### 🎃 Seasonal Variations
- **Christmas Word Hunt**: Holiday-themed word search
- **Valentine's Phrases**: Romantic phrase matching
- **Summer Vocabulary**: Beach and travel words

---

## Contributing New Games

When adding new games to Lingo, follow these guidelines:

### 1. Create Game Components
- Main window component in `src/components/Windows/`
- Sub-components in dedicated folder (e.g., `src/components/GameName/`)
- Custom hook for game logic in `src/hooks/`
- Data files in `src/data/`

### 2. Register Window Type
- Add import to `WindowManager.jsx`
- Add case to window type switch
- Define default size and position

### 3. Add Taskbar Entry
- Import necessary icons
- Create handler function
- Add button to Start menu
- Consider theme-specific visibility

### 4. Document the Game
- Create `GAME_NAME.md` with complete guide
- Add requirements in `.kiro/specs/`
- Update this `GAMES.md` file
- Include screenshots if possible

### 5. Follow Patterns
- Use custom hooks for logic
- Inline styles for consistency
- Keyboard support
- Score tracking
- Difficulty levels
- Hint systems

---

## Game Statistics

Track your progress across all games:

### Word Scramble
- Total games played
- Total score
- Best streak
- Average time per word

### Halloween Hangman
- Total games played
- Total wins
- Current streak
- Total score

*Statistics are stored in component state and reset on page refresh. Future enhancement: persist to localStorage or Firebase.*

---

## Keyboard Shortcuts

### Global
- `Ctrl + /` - Show help modal with all shortcuts

### Game-Specific
- **Halloween Hangman**: Press any letter key (A-Z) to guess
- **Word Scramble**: Type letters to form words

---

## Tips for Success

### Word Scramble
1. Look for common prefixes/suffixes
2. Start with vowels
3. Use hints strategically
4. Practice pattern recognition

### Halloween Hangman
1. Start with common vowels (A, E, I, O, U)
2. Try frequent consonants (T, N, S, R)
3. Read hints carefully
4. Look for word patterns
5. Build win streaks for bonus points

---

## Troubleshooting

### Game Won't Open
- Check if theme requirement met (Halloween Hangman)
- Ensure Start menu is working
- Try refreshing the page

### Keyboard Not Working
- Click inside the game window
- Check browser focus
- Verify keyboard permissions

### Performance Issues
- Close other windows
- Refresh the page
- Check browser console for errors

---

**Have fun learning and playing!** 🎮📚✨
