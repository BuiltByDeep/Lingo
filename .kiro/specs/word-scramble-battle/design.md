# Design Document

## Overview

Word Scramble Battle is a multiplayer real-time vocabulary game that integrates with the existing Lingo chat room system. The game allows 2+ players in a chat room to compete by unscrambling words in their target language. The architecture leverages Firebase Realtime Database for state synchronization, React hooks for local state management, and the existing window system for UI presentation.

The game follows a lobby → rounds → results flow, with all game state stored in Firebase and synchronized across all players in real-time. Players submit answers through the existing chat input, and the system validates answers client-side with Firebase security rules preventing tampering.

## Architecture

### System Components

1. **Game Window Component** (`WordScrambleBattleWindow.jsx`)
   - Main container managing game screens
   - Subscribes to Firebase game state
   - Routes between lobby, gameplay, round results, and final scoreboard

2. **Firebase Game Service** (`gameService.js`)
   - CRUD operations for game rooms
   - Real-time subscriptions to game state
   - Answer validation and scoring logic

3. **Game State Hook** (`useWordScrambleBattle.js`)
   - Local state management
   - Firebase subscription lifecycle
   - Game flow orchestration

4. **Screen Components**
   - `LobbyScreen.jsx` - Player list, ready status, difficulty selection
   - `BattleGamePlayScreen.jsx` - Scrambled word, timer, scoreboard
   - `RoundResultsScreen.jsx` - Winner announcement, correct answer
   - `FinalScoreboardScreen.jsx` - Rankings, play again option

### Data Flow

```
User Action → Local State Update → Firebase Write → Firebase Listener → All Clients Update
```


### Integration Points

- **Chat Room Window**: "Start Game" button triggers game creation
- **Window Manager**: Opens game window for all room participants
- **Word Bank Service**: Reuses existing word data from single-player game
- **Theme System**: Applies current theme to game window styling
- **Firebase Auth**: Uses current user for player identification

## Components and Interfaces

### WordScrambleBattleWindow Component

```javascript
interface WordScrambleBattleWindowProps {
  roomId: string;           // Chat room identifier
  roomConfig: {
    languageCode: string;   // e.g., 'es-ES', 'en-US'
    languageName: string;   // e.g., 'Spanish', 'English'
  };
  onClose: () => void;
}
```

**Responsibilities:**
- Subscribe to game state from Firebase
- Render appropriate screen based on game status
- Handle window close and cleanup

### Game Service Interface

```javascript
// Create new game
createGame(roomId, hostUserId, languageCode): Promise<gameId>

// Join game
joinGame(gameId, userId, username): Promise<void>

// Update ready status
setPlayerReady(gameId, userId, isReady): Promise<void>

// Set difficulty
setDifficulty(gameId, difficulty): Promise<void>

// Start game
startGame(gameId): Promise<void>

// Submit answer
submitAnswer(gameId, userId, answer, timestamp): Promise<result>

// Quit game
quitGame(gameId, userId): Promise<void>

// Subscribe to game state
subscribeToGame(gameId, callback): unsubscribe
```


## Data Models

### Game Room Schema (Firebase)

```javascript
games/{gameId}: {
  roomId: string,              // Associated chat room
  hostUserId: string,          // Game creator
  languageCode: string,        // Target language
  status: 'lobby' | 'in_round' | 'round_results' | 'finished',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  currentRound: number,        // 1-10
  totalRounds: number,         // Default: 10
  
  // Current round data
  scrambledWord: string,
  correctAnswer: string,
  category: string,
  hint: string,
  roundStartTime: timestamp,
  roundDuration: number,       // Seconds (default: 30)
  
  // Players
  players: {
    [userId]: {
      username: string,
      isReady: boolean,
      score: number,
      hasAnswered: boolean,    // For current round
      consecutiveCorrect: number
    }
  },
  
  // Round results
  currentRoundWinner: userId | null,
  currentRoundAnswers: {
    [userId]: {
      answer: string,
      timestamp: number,
      isCorrect: boolean,
      points: number
    }
  },
  
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Local State (React)

```javascript
interface GameState {
  gameId: string;
  status: GameStatus;
  difficulty: Difficulty;
  currentRound: number;
  totalRounds: number;
  scrambledWord: string;
  category: string;
  hint: string;
  timeRemaining: number;
  players: Player[];
  currentUser: Player;
  roundWinner: Player | null;
  isHost: boolean;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several redundant properties:
- Requirements 11.2 and 11.3 are specific instances of 11.1 (language-specific word selection)
- These can be combined into a single comprehensive property that tests all supported languages

The following properties represent unique validation requirements:

**Property 1: Player join initialization**
*For any* user joining a game lobby, the system should add that user to the player list with isReady set to false and score set to 0
**Validates: Requirements 1.4, 4.4**

**Property 2: Ready status toggle**
*For any* player in the lobby, toggling ready status twice should return the player to their original ready state (round-trip property)
**Validates: Requirements 2.1, 2.3**

**Property 3: Ready status UI indicator**
*For any* player with isReady true, the rendered player list should include a checkmark indicator next to that player's name
**Validates: Requirements 2.2**

**Property 4: Difficulty selection persistence**
*For any* difficulty level (beginner, intermediate, advanced), when selected by the host, the game state should reflect that difficulty and all subsequent words should match that difficulty
**Validates: Requirements 3.2, 3.4**

**Property 5: Game start state transition**
*For any* game with at least 2 players, when the host starts the game, the status should transition to "in_round" and a scrambled word should be loaded
**Validates: Requirements 4.1, 4.2**

**Property 6: Answer validation**
*For any* player message during an active round, the system should compare it (case-insensitive, trimmed) to the correct answer and mark the player accordingly
**Validates: Requirements 6.1, 6.2, 14.2, 14.3**

**Property 7: First correct answer scoring**
*For any* round, the first player to submit a correct answer should receive exactly 10 points
**Validates: Requirements 6.3**

**Property 8: Subsequent correct answer scoring**
*For any* round, players who submit correct answers after the first should receive exactly 3 points
**Validates: Requirements 6.4**

**Property 9: Incorrect answer scoring**
*For any* incorrect answer submitted, the player should receive 0 points
**Validates: Requirements 6.5**

**Property 10: Correct answer triggers results**
*For any* round, when the first correct answer is submitted, the game status should transition to "round_results"
**Validates: Requirements 7.1**

**Property 11: Round results display**
*For any* round with correct answers, the results screen should display all players who answered correctly with their earned points
**Validates: Requirements 7.5**

**Property 12: Scoreboard reactivity**
*For any* player score change, the scoreboard should update to reflect the new score immediately
**Validates: Requirements 8.2**

**Property 13: Leader crown indicator**
*For any* game state, the player with the highest score should have a crown emoji displayed next to their name on the scoreboard
**Validates: Requirements 8.3**

**Property 14: Streak fire indicator**
*For any* player with consecutiveCorrect > 0, a fire emoji should be displayed next to their name
**Validates: Requirements 8.4**

**Property 15: Scoreboard sorting**
*For any* set of players, the scoreboard should always display players sorted by score in descending order
**Validates: Requirements 8.5, 9.3**

**Property 16: Play again reset**
*For any* completed game, clicking "Play Again" should reset all player scores to 0 and return to lobby status (round-trip property)
**Validates: Requirements 9.5**

**Property 17: Player quit removal**
*For any* player who quits, that player should be removed from the active player list
**Validates: Requirements 10.3**

**Property 18: Host reassignment**
*For any* game where the host quits and other players remain, a new host should be assigned from the remaining players
**Validates: Requirements 10.4**

**Property 19: Language-specific word selection**
*For any* supported language (Spanish, English, French, etc.), when a game is created in that language's chat room, all words should come from that language's word bank
**Validates: Requirements 11.1, 11.2, 11.3**

**Property 20: Language-specific hints and categories**
*For any* word displayed, the hint and category should be in the same language as the word
**Validates: Requirements 11.4, 11.5**

**Property 21: Firebase state synchronization**
*For any* game state update, the change should be written to Firebase and reflected in all connected clients
**Validates: Requirements 13.1**

**Property 22: Mid-game join state loading**
*For any* player joining a game in progress, the player should load the current game state from Firebase
**Validates: Requirements 13.3**

**Property 23: Single answer per round**
*For any* player in a round, only the first answer submission should be accepted; subsequent submissions should be ignored
**Validates: Requirements 14.1**


## Error Handling

### Network Errors
- Display "Connection lost" message when Firebase connection drops
- Retry Firebase operations with exponential backoff
- Show reconnection status to users
- Preserve local game state during brief disconnections

### Invalid State Errors
- Validate game exists before operations
- Check player permissions (host-only actions)
- Prevent operations on finished games
- Handle missing or corrupted game data gracefully

### User Input Errors
- Validate answer submissions (non-empty, reasonable length)
- Prevent spam submissions (rate limiting)
- Handle special characters in answers
- Sanitize user input before Firebase writes

### Edge Cases
- Handle all players quitting simultaneously
- Manage host quitting during critical game moments
- Handle timer expiration edge cases
- Prevent race conditions in answer submissions

## Testing Strategy

### Unit Testing
- Test answer validation logic (case-insensitive, trimming)
- Test scoring calculations (first answer, subsequent answers)
- Test state transitions (lobby → in_round → results → finished)
- Test player management (join, quit, ready toggle)
- Test difficulty selection and word filtering
- Test scoreboard sorting and leader detection
- Test streak tracking logic

### Property-Based Testing

The testing strategy uses **fast-check** library for property-based testing. Each property test should run a minimum of 100 iterations.

**Property Test Requirements:**
- Each property-based test must be tagged with a comment referencing the design document property
- Tag format: `// Feature: word-scramble-battle, Property {number}: {property_text}`
- Each correctness property must be implemented by a single property-based test
- Property tests should be placed close to implementation to catch errors early

**Test Generators:**
- Generate random player sets (2-10 players)
- Generate random game states (lobby, in_round, results, finished)
- Generate random answers (correct, incorrect, case variations, whitespace)
- Generate random scores and streaks
- Generate random difficulty levels
- Generate random language codes

**Example Property Test Structure:**
```javascript
// Feature: word-scramble-battle, Property 6: Answer validation
fc.assert(
  fc.property(
    fc.string(), // player answer
    fc.string(), // correct answer
    (playerAnswer, correctAnswer) => {
      const result = validateAnswer(playerAnswer, correctAnswer);
      // Verify case-insensitive and trimmed comparison
      return result === (
        playerAnswer.trim().toLowerCase() === 
        correctAnswer.trim().toLowerCase()
      );
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing
- Test Firebase read/write operations
- Test real-time synchronization between multiple clients
- Test game flow from lobby to completion
- Test chat integration (answer submission via chat)
- Test window management integration

### Manual Testing Checklist
- Create game with 2+ players
- Test ready status toggling
- Test all three difficulty levels
- Submit correct and incorrect answers
- Test first vs subsequent answer scoring
- Verify scoreboard updates in real-time
- Test leader crown and streak fire indicators
- Complete full 10-round game
- Test play again functionality
- Test quit at various game stages
- Test host reassignment when host quits
- Test in multiple language rooms (Spanish, English, French)
- Verify retro styling matches existing game

