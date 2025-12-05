# Halloween Hangman - Requirements

## Overview
A spooky word-guessing game integrated into the Lingo app's Halloween theme. Players guess Halloween-themed words before a monster fully awakens.

## Functional Requirements

### FR1: Game Modes
- **FR1.1**: Support three difficulty levels (Beginner, Intermediate, Advanced)
- **FR1.2**: Each difficulty has unique word lists and wrong guess limits
- **FR1.3**: Difficulty selection screen shown at game start

### FR2: Word Bank
- **FR2.1**: Beginner: 14+ simple words (3-6 letters)
- **FR2.2**: Intermediate: 14+ moderate words (6-10 letters)
- **FR2.3**: Advanced: 12+ complex words (10+ letters)
- **FR2.4**: Each word includes a helpful hint

### FR3: Gameplay
- **FR3.1**: Display word as underscores with spaces
- **FR3.2**: On-screen keyboard with A-Z letters
- **FR3.3**: Physical keyboard support for letter input
- **FR3.4**: Track guessed letters (disable already guessed)
- **FR3.5**: Reveal correct letters in word display
- **FR3.6**: Increment wrong guess counter for incorrect letters
- **FR3.7**: Display list of wrong letters

### FR4: Monster Visualization
- **FR4.1**: 7 progressive monster stages using emojis
- **FR4.2**: Each wrong guess reveals next stage
- **FR4.3**: Visual effects (glow, float animation)
- **FR4.4**: Wrong guess counter display

### FR5: Win/Loss Conditions
- **FR5.1**: Win: All letters guessed correctly
- **FR5.2**: Loss: Wrong guesses reach maximum allowed
- **FR5.3**: Display appropriate end-game message
- **FR5.4**: Show correct word on loss

### FR6: Scoring System
- **FR6.1**: Base points by difficulty (10/15/25)
- **FR6.2**: Streak bonus (+5 per consecutive win)
- **FR6.3**: Perfect round bonus (+20 for 0 wrong guesses)
- **FR6.4**: Wrong guess penalty (-1 per wrong letter)
- **FR6.5**: Track total score across games

### FR7: Statistics
- **FR7.1**: Track total games played
- **FR7.2**: Track total wins
- **FR7.3**: Track current streak
- **FR7.4**: Display stats on difficulty selection screen

### FR8: Game Controls
- **FR8.1**: "New Word" button - restart with same difficulty
- **FR8.2**: "Change Difficulty" button - return to selection
- **FR8.3**: Keyboard event handling for letter input
- **FR8.4**: Disable input during game over states

### FR9: Theme Integration
- **FR9.1**: Only available in Halloween theme
- **FR9.2**: Accessible from Start menu when Halloween theme active
- **FR9.3**: Retro Halloween visual design (orange/purple)

## Non-Functional Requirements

### NFR1: Performance
- **NFR1.1**: Instant letter selection response (<50ms)
- **NFR1.2**: Smooth animations (60fps)
- **NFR1.3**: No lag during keyboard input

### NFR2: Usability
- **NFR2.1**: Clear visual feedback for all actions
- **NFR2.2**: Intuitive keyboard and mouse controls
- **NFR2.3**: Readable text with high contrast
- **NFR2.4**: Helpful hints for all words

### NFR3: Accessibility
- **NFR3.1**: Full keyboard navigation support
- **NFR3.2**: Clear visual states (guessed/unguessed letters)
- **NFR3.3**: Large, readable fonts
- **NFR3.4**: Color-blind friendly design

### NFR4: Maintainability
- **NFR4.1**: Modular component structure
- **NFR4.2**: Reusable custom hook for game logic
- **NFR4.3**: Centralized word bank data
- **NFR4.4**: Clear separation of concerns

### NFR5: Extensibility
- **NFR5.1**: Easy to add new difficulty levels
- **NFR5.2**: Simple to expand word lists
- **NFR5.3**: Configurable scoring rules
- **NFR5.4**: Customizable monster stages

## Technical Requirements

### TR1: Technology Stack
- **TR1.1**: React 19 with hooks
- **TR1.2**: Pure frontend logic (no backend/AI)
- **TR1.3**: CSS-in-JS for styling
- **TR1.4**: Lucide React for icons

### TR2: State Management
- **TR2.1**: Custom hook (useHalloweenHangman) for game logic
- **TR2.2**: Local component state for UI
- **TR2.3**: WindowContext integration for window management

### TR3: Data Structure
- **TR3.1**: Word bank organized by difficulty
- **TR3.2**: Each word object: { word, hint }
- **TR3.3**: Difficulty config: { label, maxWrong, points }

### TR4: Browser Compatibility
- **TR4.1**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **TR4.2**: Keyboard API support
- **TR4.3**: CSS animations support

## User Stories

### US1: Casual Player
"As a casual player, I want to play a quick Halloween-themed word game so I can have fun during my break."

### US2: Language Learner
"As a language learner, I want to practice spelling Halloween vocabulary so I can improve my English skills."

### US3: Competitive Player
"As a competitive player, I want to track my score and streak so I can challenge myself to improve."

### US4: Beginner
"As a beginner, I want easy words with hints so I don't get frustrated."

### US5: Advanced Player
"As an advanced player, I want challenging words with fewer wrong guesses allowed so the game stays interesting."

## Acceptance Criteria

### AC1: Game Launch
- [ ] Game only appears in Start menu when Halloween theme is active
- [ ] Clicking game opens window with difficulty selection
- [ ] Window is draggable and resizable

### AC2: Difficulty Selection
- [ ] Three difficulty buttons displayed with clear labels
- [ ] Each button shows max wrong guesses and points
- [ ] Stats displayed if games have been played
- [ ] Clicking difficulty starts game

### AC3: Gameplay
- [ ] Word displayed as underscores with spaces
- [ ] Hint displayed below word
- [ ] On-screen keyboard shows all 26 letters
- [ ] Clicking letter guesses it
- [ ] Pressing keyboard key guesses it
- [ ] Guessed letters become disabled
- [ ] Correct letters reveal in word
- [ ] Wrong letters appear in wrong list
- [ ] Monster stage updates on wrong guess

### AC4: Win Condition
- [ ] Game detects when all letters guessed
- [ ] Win message displayed
- [ ] Score calculated correctly
- [ ] Streak incremented
- [ ] Perfect bonus awarded if applicable

### AC5: Loss Condition
- [ ] Game detects when max wrong guesses reached
- [ ] Loss message displayed
- [ ] Correct word revealed
- [ ] Streak reset to 0

### AC6: Game Controls
- [ ] "New Word" button starts new round
- [ ] "Change Difficulty" returns to selection
- [ ] Buttons disabled during active play
- [ ] Keyboard input disabled during game over

### AC7: Visual Design
- [ ] Halloween color scheme (orange/purple)
- [ ] Retro styling consistent with app theme
- [ ] Smooth animations on interactions
- [ ] Clear visual hierarchy

## Out of Scope

- Sound effects (future enhancement)
- Multiplayer mode
- Custom word lists
- Timed challenges
- Leaderboards
- Word definitions on completion
- Multiple language support
- Mobile touch optimization
- Accessibility screen reader support (future enhancement)
