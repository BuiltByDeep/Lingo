# Implementation Plan

- [x] 1. Set up word bank data and service layer
  - Create word bank data file with 15+ words per difficulty level (beginner, intermediate, advanced)
  - Implement WordBankService class with methods for filtering by level and scrambling words
  - Implement Fisher-Yates shuffle algorithm ensuring scrambled word differs from original
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 2.4_

- [ ]* 1.1 Write property test for scrambling algorithm
  - **Property 1: Scrambled words differ from original**
  - **Validates: Requirements 2.4**

- [ ]* 1.2 Write property test for word bank completeness
  - **Property 18: Word bank completeness**
  - **Validates: Requirements 9.4**

- [x] 2. Implement core game logic functions
  - Create scoring calculation function (10/7/5 points based on attempts, -2 for hints)
  - Create streak bonus calculation function (10 points every 5 correct)
  - Create answer validation function (case-insensitive comparison)
  - Create letter reveal function (random unrevealed letter selection)
  - _Requirements: 3.2, 3.4, 3.5, 2.3, 5.4, 3.1_

- [ ]* 2.1 Write property test for case-insensitive validation
  - **Property 4: Case-insensitive validation**
  - **Validates: Requirements 3.1**

- [ ]* 2.2 Write property test for first attempt scoring
  - **Property 5: First attempt scoring**
  - **Validates: Requirements 3.2**

- [ ]* 2.3 Write property test for second attempt scoring
  - **Property 6: Second attempt scoring**
  - **Validates: Requirements 3.4**

- [ ]* 2.4 Write property test for third+ attempt scoring
  - **Property 7: Third+ attempt scoring**
  - **Validates: Requirements 3.5**

- [ ]* 2.5 Write property test for streak bonus
  - **Property 12: Streak bonus at multiples of 5**
  - **Validates: Requirements 5.4**

- [ ]* 2.6 Write property test for letter reveal correctness
  - **Property 3: Letter reveal correctness**
  - **Validates: Requirements 2.3**

- [x] 3. Create LevelSelectionScreen component
  - Build UI with three level buttons (Beginner, Intermediate, Advanced)
  - Display level details (word length, time limit, target count) on each button
  - Implement level selection handler that updates game state
  - Apply retro styling consistent with Lingo aesthetic
  - _Requirements: 1.3, 6.1, 6.2, 6.3_

- [x] 4. Create GamePlayScreen component structure
  - Build main game layout with header, word display, input area, and sidebar
  - Create GameHeader sub-component with title and level badge
  - Create WordDisplay sub-component for scrambled word and category hint
  - Create InputArea sub-component with text input and action buttons
  - Create GameSidebar sub-component for score, streak, timer, and progress
  - _Requirements: 2.1, 2.2, 5.1, 5.2, 5.5_

- [ ]* 4.1 Write property test for category hints display
  - **Property 2: Category hints always displayed**
  - **Validates: Requirements 2.2**

- [ ]* 4.2 Write property test for level name persistence
  - **Property 14: Level name persistence**
  - **Validates: Requirements 6.4**

- [x] 5. Implement game state management and flow
  - Set up React state for game session (score, streak, timer, current word, etc.)
  - Implement game initialization when level is selected
  - Implement word loading and scrambling on game start
  - Implement automatic word advancement after correct answer (1.5-2s delay)
  - _Requirements: 2.1, 3.6, 6.4_

- [x] 6. Implement answer submission and validation
  - Create handleSubmit function that validates user input
  - Update score based on attempt count and hint usage
  - Display success feedback with word meaning and example
  - Display error feedback with hints for incorrect answers
  - Track attempt count per word
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 2.5_

- [ ]* 6.1 Write property test for correct answer feedback
  - **Property 13: Correct answer shows meaning and example**
  - **Validates: Requirements 2.5**

- [ ]* 6.2 Write property test for feedback indicators
  - **Property 17: Feedback indicators**
  - **Validates: Requirements 8.3**

- [x] 7. Implement skip functionality
  - Create handleSkip function that advances to next word
  - Ensure skip does not change score
  - Ensure skip does not reset streak
  - Reset attempt counter for next word
  - _Requirements: 4.1, 4.2, 4.3_

- [ ]* 7.1 Write property test for skip preserves score
  - **Property 8: Skip preserves score**
  - **Validates: Requirements 4.1**

- [ ]* 7.2 Write property test for skip resets attempts
  - **Property 9: Skip resets attempts**
  - **Validates: Requirements 4.2**

- [ ]* 7.3 Write property test for skip preserves streak
  - **Property 10: Skip preserves streak**
  - **Validates: Requirements 4.3**

- [x] 8. Implement hint system
  - Create handleRevealLetter function that reveals one correct letter
  - Update UI to highlight revealed letters in scrambled word
  - Deduct 2 points from potential score when hint is used
  - Disable hint button when all letters revealed
  - _Requirements: 2.3_

- [x] 9. Implement streak tracking
  - Update streak counter on correct answers
  - Reset streak to zero on incorrect answers
  - Maintain streak on skip actions
  - Award 10-point bonus at every 5-correct milestone
  - Display streak with visual indicator (fire emoji) when active
  - _Requirements: 5.2, 5.3, 5.4_

- [ ]* 9.1 Write property test for incorrect answer resets streak
  - **Property 11: Incorrect answer resets streak**
  - **Validates: Requirements 5.3**

- [x] 10. Implement countdown timer
  - Create timer using setInterval that decrements every second
  - Display remaining time in MM:SS format
  - Apply warning styling when time < 10 seconds
  - End game automatically when timer reaches zero
  - Clean up interval on component unmount
  - _Requirements: 5.5, 5.6_

- [x] 11. Create SummaryScreen component
  - Display final score, words solved, and words missed counts
  - Show list of missed words with correct spelling, meaning, and example
  - Add "Play Again" button that returns to level selection
  - Add "Close" button that closes the game window
  - Apply retro styling consistent with game aesthetic
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 11.1 Write property test for summary screen completeness
  - **Property 15: Summary screen completeness**
  - **Validates: Requirements 7.1**

- [ ]* 11.2 Write property test for missed words detail
  - **Property 16: Missed words detail**
  - **Validates: Requirements 7.2**

- [x] 12. Create main WordScrambleWindow component
  - Set up component with gameState management ('level-select', 'playing', 'summary')
  - Render appropriate screen based on current gameState
  - Implement game initialization and reset functions
  - Integrate with WindowContext for window lifecycle
  - _Requirements: 1.2, 1.4_

- [x] 13. Integrate with Start menu and WindowContext
  - Add "Games" menu item to Desktop component's Start menu
  - Add "Word Scramble Challenge" submenu item with game icon
  - Implement window opening via WindowContext.openWindow
  - Configure window with default size (600×500) and position
  - Prevent multiple game windows from opening simultaneously
  - _Requirements: 1.1, 1.2_

- [x] 14. Implement theme integration
  - Use ThemeContext to apply current theme colors to game UI
  - Ensure game elements respect theme's background, text, and border colors
  - Test game appearance with all four Lingo themes
  - _Requirements: 8.1, 8.4_

- [x] 15. Add error handling and edge cases
  - Handle empty input submission (show message, don't count as attempt)
  - Handle timer reaching zero during input (end game immediately)
  - Handle empty word bank for selected level (show error, return to selection)
  - Trim whitespace from user input before validation
  - _Requirements: 3.1, 5.6_

- [x] 16. Implement word order randomization
  - Shuffle word array when game session starts
  - Ensure different word order across multiple sessions
  - _Requirements: 9.5_

- [ ]* 16.1 Write property test for word order randomization
  - **Property 19: Word order randomization**
  - **Validates: Requirements 9.5**

- [x] 17. Add UI polish and animations
  - Add fade-in animation for correct answer feedback (0.3s)
  - Add shake animation for incorrect answer (0.5s)
  - Add pulse animation for timer warning (< 10 seconds)
  - Add smooth transitions between screens (0.2s fade)
  - Ensure all buttons have hover effects
  - _Requirements: 8.2_

- [x] 18. Implement keyboard shortcuts
  - Enable Enter key to submit answer
  - Enable Tab navigation through buttons
  - Add focus indicators for keyboard navigation
  - _Requirements: 8.1_

- [ ]* 19. Write unit tests for UI components
  - Test LevelSelectionScreen renders all three levels
  - Test GamePlayScreen displays all required elements
  - Test SummaryScreen shows correct statistics
  - Test button click handlers
  - Test input field updates

- [x] 20. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 21. Manual testing and bug fixes
  - Test complete game flow from start to finish
  - Test all three difficulty levels
  - Test skip and hint functionality
  - Test timer countdown and game end
  - Test window minimize/restore/close
  - Verify retro styling consistency across themes
  - Fix any discovered bugs
  - _Requirements: All_
