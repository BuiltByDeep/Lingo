# 🎃 Halloween Hangman Game

A spooky twist on the classic Hangman game! Guess the hidden Halloween word before the monster fully awakens.

## 🕸️ Game Description

Halloween Hangman is a retro-style word-guessing game where players must identify Halloween-themed words by selecting letters. Each wrong guess brings a spooky monster closer to life. Win by completing the word before the creature fully appears!

## 🎮 How to Play

1. **Select Difficulty**: Choose from Beginner, Intermediate, or Advanced
2. **Guess Letters**: Click letters on the on-screen keyboard or use your physical keyboard
3. **Watch the Monster**: Each wrong guess reveals another part of the Halloween creature
4. **Win or Lose**: 
   - Complete the word → You Survived! 🎉
   - Monster fully appears → Game Over 💀

## 🎯 Difficulty Modes

### 🟢 Beginner (Ages 6-12 / New Learners)
- **Words**: Simple Halloween vocabulary (bat, cat, moon, ghost, boo, mask, etc.)
- **Wrong Guesses Allowed**: 7
- **Points per Win**: 10

### 🟠 Intermediate
- **Words**: Moderate vocabulary (pumpkin, witch, shadow, lantern, graveyard, etc.)
- **Wrong Guesses Allowed**: 6
- **Points per Win**: 15

### 🟣 Advanced
- **Words**: Complex vocabulary (supernatural, incantation, apparition, etc.)
- **Wrong Guesses Allowed**: 5
- **Points per Win**: 25

## 🏆 Scoring System

- **Base Points**: Varies by difficulty (10/15/25)
- **Streak Bonus**: +5 points per consecutive win
- **Perfect Round**: +20 bonus (0 wrong guesses)
- **Wrong Guess Penalty**: -1 point per wrong letter

## 👻 Monster Stages

The monster awakens progressively with each wrong guess:

1. 🎃 Pumpkin eyes glow
2. 😈 Crooked mouth appears
3. 👻 Ghost emerges
4. 🦇 Bats fly around
5. 🕷️ Spiders crawl out
6. 🌫️ Creepy fog rises
7. 💀 Full monster awakens! (Game Over)

## ⌨️ Controls

- **Mouse**: Click letters on the on-screen keyboard
- **Keyboard**: Press any letter key (A-Z)
- **New Word Button**: Start a new round with same difficulty
- **Change Difficulty Button**: Return to difficulty selection

## 🎨 Features

- **Retro Halloween Theme**: Orange and purple color scheme with spooky effects
- **Visual Feedback**: Animated monster stages and floating emojis
- **Hint System**: Each word comes with a helpful hint
- **Stats Tracking**: Track wins, total games, score, and streak
- **Responsive Design**: Works on all screen sizes
- **Keyboard Support**: Full keyboard navigation

## 🎓 Educational Value

- **Vocabulary Building**: Learn Halloween-themed words
- **Spelling Practice**: Reinforce correct spelling
- **Pattern Recognition**: Identify common letter patterns
- **Critical Thinking**: Strategic letter selection
- **Language Learning**: Perfect for ESL students

## 🕹️ Game States

1. **Difficulty Selection**: Choose your challenge level
2. **Playing**: Active game with letter guessing
3. **Won**: Successfully guessed the word
4. **Lost**: Monster fully awakened

## 📊 Statistics

The game tracks:
- Total games played
- Total wins
- Current score
- Win streak
- Win/loss ratio

## 🎃 Halloween Theme Integration

This game is **only available when the Halloween theme is active**. Switch to the Halloween theme from the taskbar theme menu to access this spooky game!

## 🚀 How to Access

1. Switch to Halloween theme (Palette icon in taskbar)
2. Click the **Start** button in the taskbar
3. Select **🎃 Halloween Hangman** from the menu
4. Choose your difficulty and start playing!

## 🧩 Technical Details

### Components
- `HalloweenHangmanWindow.jsx` - Main game window
- `MonsterStage.jsx` - Visual monster progression
- `LetterKeyboard.jsx` - On-screen keyboard

### Hook
- `useHalloweenHangman.js` - Game logic and state management

### Data
- `halloweenWords.js` - Word bank with 3 difficulty levels

### Features
- Pure frontend logic (no AI required)
- React hooks for state management
- Keyboard event handling
- Animated CSS effects
- Responsive grid layout

## 🎉 Tips for Success

1. **Start with vowels**: A, E, I, O, U appear in most words
2. **Common consonants**: Try T, N, S, R early
3. **Use the hint**: Read the hint carefully for clues
4. **Pattern recognition**: Look for common word patterns
5. **Build streaks**: Consecutive wins earn bonus points!

---

**Have fun and don't let the monster catch you!** 👻🎃🕸️
