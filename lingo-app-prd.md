# Lingo App - Product Requirements Document
### Resurrection Category - Yahoo Chat Reimagined for Language Learning

---

## 📋 Executive Summary

**Project Name**: Lingo App  
**Category**: Resurrection  
**Tagline**: "Yahoo Chat reborn as an AI-powered language learning community"

**Core Concept**: Resurrect the beloved Yahoo Chat experience (draggable windows, chat rooms, usernames, nostalgic desktop UI) and repurpose it for global language learning with modern AI capabilities.

**Unique Value**: Combines nostalgic early-2000s chat interface with cutting-edge AI to create an engaging, social language learning platform that feels familiar yet powerful.

---

## 🎯 Product Vision

### What We're Resurrecting
- **Yahoo Chat Rooms**: Public chat spaces organized by topic (now language-focused)
- **Yahoo Messenger Windows**: Draggable, resizable, overlapping chat windows
- **Desktop Environment**: Customizable wallpapers/themes, taskbar, window chrome
- **Username Culture**: Simple usernames, user lists, online/away/offline status
- **Social Discovery**: See who's in rooms, initiate private chats

### What We're Modernizing
- **AI Language Coach**: Built-in buddy for grammar help, translations, pronunciation
- **Voice Messages**: Send/receive voice notes for speaking practice
- **Real-time Translation**: Understand messages in any language
- **Grammar Correction**: One-click AI corrections with explanations
- **Smart Feedback**: AI analyzes conversations and provides learning insights

---

## 🎨 User Experience Overview

### Entry Flow
1. User lands on a themed "desktop" (like Windows XP desktop)
2. Prompted to enter a username (no complex auth for MVP)
3. Desktop loads with taskbar showing available chat rooms
4. User can open multiple windows simultaneously

### Desktop Environment
- **Wallpaper/Theme Options**:
  - Retro Yahoo (purple gradients, classic logo styling)
  - Halloween (spooky orange/black, themed decorations)
  - Cyberpunk Neon (dark with neon accents)
  - Clean Modern (minimalist white/gray)
  
- **Taskbar** (bottom of screen):
  - Shows open windows as tabs
  - "Start" menu to open new rooms or AI Buddy
  - Theme switcher icon
  - Clock display

- **Window System**:
  - All windows draggable by title bar
  - Resizable from corners/edges
  - Minimize/Maximize/Close buttons
  - Z-index management (click to bring to front)
  - Smooth animations for open/close/minimize

---

## 🏗️ Core Features (MVP Scope)

### Feature 1: Desktop Environment
**Priority**: P0 (Must Have)

**Components**:
- Desktop container with themed background
- Taskbar component
- Window manager system
- Theme switcher

**User Stories**:
- As a user, I can change the desktop theme to match my mood
- As a user, I can see all my open windows in the taskbar
- As a user, I can click the taskbar to bring a window to front
- As a user, I can drag windows around the desktop

**Technical Requirements**:
- React component with state management for windows
- CSS for 4 distinct themes
- Z-index state management
- Window position/size state persistence in session storage

**Acceptance Criteria**:
- ✅ Desktop renders with default theme
- ✅ Theme switcher changes wallpaper instantly
- ✅ Taskbar shows all open windows
- ✅ Clicking taskbar focuses correct window

---

### Feature 2: Language Chat Room
**Priority**: P0 (Must Have)

**Room Structure**:
- **Default Room**: "Spanish - Intermediate Chat"
- Can expand to multiple rooms if time permits

**Components**:
- Chat window (draggable/resizable)
- Message input area
- Message display area
- User list sidebar (right side)
- Room title bar

**User Stories**:
- As a user, I can join a Spanish chat room
- As a user, I can see other users in the room
- As a user, I can send text messages that appear to all users
- As a user, I can see messages from others in real-time
- As a user, I can see usernames next to each message

**Message Features**:
- Timestamps on messages
- Username display
- Message grouping (multiple messages from same user)
- Scroll to bottom on new message

**Technical Requirements**:
- Firebase Realtime Database or Supabase for real-time sync
- Message data structure:
  ```json
  {
    "messageId": "msg_123",
    "userId": "user_456",
    "username": "lingo_learner_92",
    "message": "¡Hola! ¿Cómo estás?",
    "timestamp": 1234567890,
    "language": "es",
    "isVoice": false,
    "voiceUrl": null
  }
  ```
- User presence tracking (online count)

**Acceptance Criteria**:
- ✅ User can open chat room window
- ✅ User can send messages that appear to others instantly
- ✅ User list shows current online users
- ✅ Messages persist across browser refresh
- ✅ Chat window is draggable and resizable

---

### Feature 3: AI Buddy Window
**Priority**: P0 (Must Have)

**Purpose**: Always-available AI language coach in a dedicated chat window

**Components**:
- Dedicated AI Buddy window (looks like private chat)
- Message input (text + voice button)
- AI response display
- Quick action buttons

**User Stories**:
- As a user, I can open AI Buddy from taskbar
- As a user, I can send text messages to AI and get helpful responses
- As a user, I can ask for grammar corrections
- As a user, I can request translations
- As a user, I can ask pronunciation questions
- As a user, I can send voice messages and get feedback

**Quick Action Buttons**:
- 🔄 "Translate this"
- ✏️ "Correct my grammar"
- 🎯 "Explain this word"
- 🗣️ "How do I pronounce..."
- 💡 "Give me practice ideas"

**AI Capabilities**:
- Grammar correction with explanations
- Translation (any language pair)
- Pronunciation guidance (phonetic breakdown)
- Vocabulary explanations
- Cultural context notes
- Conversation practice suggestions

**Technical Requirements**:
- Claude API integration (Anthropic)
- System prompt for AI Buddy personality:
  ```
  You are a friendly language learning coach. You help learners
  improve their Spanish/French/etc. Always be encouraging, explain
  grammar rules clearly, and provide cultural context. Keep responses
  concise but educational.
  ```
- Web Speech API for voice input
- Text-to-Speech for AI voice responses (optional for MVP)

**Message Flow**:
```
User: "¿Como estas?" 
AI Buddy: "Great attempt! Small correction: it's '¿Cómo estás?' 
(with accent marks). The accent on 'Cómo' distinguishes it from 
'como' (I eat). The accent on 'estás' shows it's present tense. 
¡Muy bien! 🎉"
```

**Acceptance Criteria**:
- ✅ AI Buddy window opens independently
- ✅ User can send messages and receive AI responses
- ✅ Quick action buttons work correctly
- ✅ Grammar correction explains the rule
- ✅ Translations include context/notes
- ✅ Voice input transcribes correctly

---

### Feature 4: In-Chat AI Features
**Priority**: P1 (Nice to Have)

**Right-Click Context Menu** on any chat message:
- 📝 "Correct my grammar"
- 🌐 "Translate to [language]"
- 🔊 "Read aloud"
- 💬 "Explain this"

**Hover Actions**:
- Show translation on hover (if different language detected)
- Show grammar confidence indicator

**Technical Requirements**:
- Claude API for corrections/translations
- Context menu component
- Language detection (simple heuristic or library)

**Acceptance Criteria**:
- ✅ Right-click shows context menu
- ✅ Grammar correction shows inline suggestion
- ✅ Translation appears in tooltip/popup

---

## 🎭 Visual Design Specifications

### Window Chrome (Yahoo Messenger Style)
```
┌─────────────────────────────────────┐
│ 🟦 Chat Room Title            _ □ ✕ │ <- Title bar (draggable)
├─────────────────────────────────────┤
│                                     │
│  Message area                       │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ [Type message...]            [Send] │ <- Input area
└─────────────────────────────────────┘
```

**Title Bar**:
- Height: 32px
- Background: Gradient (theme-dependent)
- Font: Bold, 14px
- Buttons: Minimize, Maximize, Close (right-aligned)

**Window Body**:
- Border: 2px solid (theme color)
- Border radius: 8px
- Box shadow: 0 4px 12px rgba(0,0,0,0.15)
- Background: Semi-transparent white/dark

**Retro UI Elements**:
- Beveled buttons (like Windows XP)
- Subtle gradients on interactive elements
- Status indicators (green dot = online)
- System fonts: Tahoma, Verdana, Arial

---

### Theme Specifications

#### Theme 1: Retro Yahoo
- **Wallpaper**: Purple gradient (#7B68EE to #4B0082)
- **Accent**: Yellow (#FFD700)
- **Window**: Light purple tint
- **Font**: Tahoma
- **Vibe**: Classic early 2000s internet

#### Theme 2: Halloween
- **Wallpaper**: Dark orange/black gradient
- **Accent**: Pumpkin orange (#FF6B35)
- **Window**: Dark with orange borders
- **Font**: Spooky serif font for titles
- **Extras**: Cobweb decorations, ghost emojis

#### Theme 3: Cyberpunk Neon
- **Wallpaper**: Dark blue/black (#0a0e27)
- **Accent**: Cyan (#00F0FF), Pink (#FF006E)
- **Window**: Dark with neon borders
- **Font**: Monospace for titles
- **Effects**: Glow effects, scanlines

#### Theme 4: Clean Modern
- **Wallpaper**: White/light gray
- **Accent**: Blue (#0066FF)
- **Window**: White with subtle shadow
- **Font**: System default (clean)
- **Vibe**: Minimalist, macOS-like

---

## 🔧 Technical Architecture

### Tech Stack

**Frontend**:
- **Framework**: React 18+
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **Draggable Windows**: `react-rnd` library
- **State Management**: React Context + useState

**Backend/Database**:
- **Real-time Chat**: Firebase Realtime Database
  - Alternative: Supabase with real-time subscriptions
- **Authentication**: None for MVP (username-only)
- **Hosting**: Vercel or Netlify

**AI Integration**:
- **LLM**: Anthropic Claude API (Sonnet 3.5)
- **Voice Input**: Web Speech API (browser native)
- **Voice Output**: Browser Text-to-Speech API
  - Alternative: ElevenLabs for better quality

**Development Tools**:
- **IDE**: Kiro with agent hooks
- **Version Control**: Git + GitHub
- **Testing**: Vitest + React Testing Library

---

### Data Models

#### User Object
```javascript
{
  userId: "user_abc123",
  username: "lingo_learner_92",
  status: "online" | "away" | "offline",
  currentRoom: "spanish-intermediate",
  language: "en", // native language
  learningLanguage: "es",
  joinedAt: 1234567890
}
```

#### Message Object
```javascript
{
  messageId: "msg_xyz789",
  roomId: "spanish-intermediate",
  userId: "user_abc123",
  username: "lingo_learner_92",
  type: "text" | "voice" | "system",
  content: "¡Hola! ¿Cómo estás?",
  voiceUrl: "https://storage.../voice.mp3", // if voice message
  timestamp: 1234567890,
  language: "es",
  isTranslated: false,
  metadata: {
    edited: false,
    reactions: [],
    aiCorrected: false
  }
}
```

#### Room Object
```javascript
{
  roomId: "spanish-intermediate",
  name: "Spanish - Intermediate Chat",
  language: "es",
  level: "intermediate",
  activeUsers: ["user_abc123", "user_def456"],
  userCount: 12,
  createdAt: 1234567890,
  description: "Practice conversational Spanish"
}
```

#### AI Conversation Object
```javascript
{
  conversationId: "conv_123",
  userId: "user_abc123",
  messages: [
    {
      role: "user",
      content: "Como estas",
      timestamp: 1234567890
    },
    {
      role: "assistant",
      content: "Great try! It's '¿Cómo estás?' with accent marks...",
      timestamp: 1234567891
    }
  ]
}
```

---

### Component Hierarchy

```
App
├── ThemeProvider
│   ├── Desktop
│   │   ├── Wallpaper
│   │   ├── WindowManager
│   │   │   ├── ChatRoomWindow
│   │   │   │   ├── WindowChrome
│   │   │   │   ├── ChatMessages
│   │   │   │   ├── MessageInput
│   │   │   │   └── UserList
│   │   │   ├── AIBuddyWindow
│   │   │   │   ├── WindowChrome
│   │   │   │   ├── ConversationView
│   │   │   │   ├── QuickActions
│   │   │   │   └── MessageInput
│   │   │   └── PrivateChatWindow (P1)
│   │   └── Taskbar
│   │       ├── StartMenu
│   │       ├── WindowTabs
│   │       ├── ThemeSwitcher
│   │       └── Clock
│   └── WelcomeModal (username entry)
└── FirebaseProvider
```

---

### File Structure

```
lingo-app/
├── public/
│   ├── themes/
│   │   ├── retro-yahoo-bg.jpg
│   │   ├── halloween-bg.jpg
│   │   ├── cyberpunk-bg.jpg
│   │   └── clean-bg.jpg
│   └── sounds/
│       ├── message-received.mp3
│       └── window-open.mp3
├── src/
│   ├── components/
│   │   ├── Desktop/
│   │   │   ├── Desktop.jsx
│   │   │   ├── Wallpaper.jsx
│   │   │   └── Taskbar.jsx
│   │   ├── Windows/
│   │   │   ├── WindowChrome.jsx
│   │   │   ├── WindowManager.jsx
│   │   │   ├── ChatRoomWindow.jsx
│   │   │   ├── AIBuddyWindow.jsx
│   │   │   └── DraggableWindow.jsx
│   │   ├── Chat/
│   │   │   ├── ChatMessages.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── UserList.jsx
│   │   │   └── VoiceRecorder.jsx
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── ThemeSwitcher.jsx
│   │       ├── ContextMenu.jsx
│   │       └── QuickActions.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   ├── WindowContext.jsx
│   │   ├── UserContext.jsx
│   │   └── ChatContext.jsx
│   ├── hooks/
│   │   ├── useWindowManager.js
│   │   ├── useFirebaseChat.js
│   │   ├── useAIBuddy.js
│   │   └── useVoiceInput.js
│   ├── services/
│   │   ├── firebase.js
│   │   ├── claudeAPI.js
│   │   ├── speechService.js
│   │   └── translationService.js
│   ├── utils/
│   │   ├── languageDetection.js
│   │   ├── grammarChecker.js
│   │   └── windowHelpers.js
│   ├── styles/
│   │   ├── themes.css
│   │   ├── windows.css
│   │   └── retro-ui.css
│   ├── App.jsx
│   └── main.jsx
├── kiro/
│   ├── hooks/
│   │   ├── test-generator.hook.js
│   │   ├── translation-validator.hook.js
│   │   ├── accessibility-checker.hook.js
│   │   └── security-scanner.hook.js
│   ├── steering/
│   │   ├── retro-ui-standards.md
│   │   ├── language-learning-patterns.md
│   │   ├── realtime-chat-architecture.md
│   │   └── ai-buddy-behavior.md
│   └── mcp/
│       └── firebase-mcp-config.json
├── tests/
│   ├── components/
│   └── integration/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Days 1-2)
**Goal**: Desktop environment + window system

**Tasks**:
- [ ] Set up React project with Vite
- [ ] Install dependencies (react-rnd, Tailwind, Firebase, Lucide)
- [ ] Create Theme Context and 4 theme styles
- [ ] Build Desktop component with wallpaper
- [ ] Implement DraggableWindow base component
- [ ] Build Taskbar with window tabs
- [ ] Create WindowManager for state management
- [ ] Add theme switcher functionality

**Deliverable**: Working desktop with draggable windows and theme switching

---

### Phase 2: Chat Room (Days 3-4)
**Goal**: Functional real-time chat

**Tasks**:
- [ ] Set up Firebase project and Realtime Database
- [ ] Create data models and security rules
- [ ] Build ChatRoomWindow component
- [ ] Implement MessageInput with send functionality
- [ ] Create MessageBubble component
- [ ] Build UserList sidebar
- [ ] Connect Firebase real-time listeners
- [ ] Add username entry modal
- [ ] Implement message persistence
- [ ] Test multi-user messaging

**Deliverable**: Working Spanish chat room with real-time messaging

---

### Phase 3: AI Buddy (Days 5-6)
**Goal**: AI language coach integration

**Tasks**:
- [ ] Set up Claude API integration
- [ ] Create AI Buddy system prompt
- [ ] Build AIBuddyWindow component
- [ ] Implement conversation view
- [ ] Add quick action buttons
- [ ] Integrate grammar correction
- [ ] Add translation feature
- [ ] Implement voice input (Web Speech API)
- [ ] Add text-to-speech for AI responses
- [ ] Test AI conversation flow

**Deliverable**: Fully functional AI language coach

---

### Phase 4: Polish & AI Features (Days 7-8)
**Goal**: In-chat AI features and UX refinements

**Tasks**:
- [ ] Add right-click context menu on messages
- [ ] Implement inline grammar corrections
- [ ] Add hover translations
- [ ] Create sound effects (message sent/received)
- [ ] Add window animations (open/close/minimize)
- [ ] Implement keyboard shortcuts
- [ ] Add loading states and error handling
- [ ] Create welcome tutorial overlay
- [ ] Add accessibility features (ARIA labels, keyboard nav)
- [ ] Performance optimization

**Deliverable**: Polished, production-ready app

---

### Phase 5: Testing & Documentation (Day 9)
**Goal**: Quality assurance and hackathon submission

**Tasks**:
- [ ] Write component tests
- [ ] Integration testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Write Kiro usage documentation
- [ ] Create demo video
- [ ] Prepare hackathon submission
- [ ] Deploy to Vercel/Netlify

**Deliverable**: Deployed app + comprehensive documentation

---

## 🎯 Kiro Integration Plan

### Steering Docs Setup (Day 1)

**File 1: `retro-ui-standards.md`**
```markdown
# Retro UI Design Standards

## Purpose
Maintain Yahoo Chat/Windows Messenger aesthetic while using modern React.

## Window Design
- All windows must use react-rnd for drag/resize
- Title bar height: 32px
- Border: 2px solid with theme color
- Border radius: 8px on window body, 8px 8px 0 0 on title bar
- Box shadow: 0 4px 12px rgba(0,0,0,0.15)

## Color Palette
Retro Yahoo Theme:
- Primary: #7B68EE (Yahoo purple)
- Accent: #FFD700 (gold)
- Background: Linear gradient #7B68EE to #4B0082

Halloween Theme:
- Primary: #FF6B35 (pumpkin orange)
- Accent: #000000 (black)
- Background: Dark orange/black gradient

## Typography
- Headers: Tahoma, bold, 14px
- Body: Verdana, 12px
- Monospace for code: Courier New

## Interaction Patterns
- Hover: Lighten color by 10%
- Active: Darken by 10%, add inner shadow
- Focus: 2px outline in accent color
- Disabled: 50% opacity

## NO Modern Patterns
- No Material Design floating buttons
- No iOS-style switches
- No glassmorphism (except cyberpunk theme)
- No rounded pills for buttons (use beveled rectangles)
```

**File 2: `language-learning-patterns.md`**
```markdown
# Language Learning Interaction Patterns

## Purpose
Ensure all AI interactions are educational and encouraging.

## Grammar Correction Format
When user makes mistake:
1. Acknowledge the attempt positively
2. Show corrected version
3. Explain the rule briefly
4. Provide example

Example:
User: "Como estas"
AI: "Nice try! ✨ 
Corrected: ¿Cómo estás?
Rule: Question words in Spanish need accent marks. 'Cómo' means 'how'.
The accent on 'estás' indicates present tense.
Example: ¿Cómo estás hoy? (How are you today?)"

## Translation Guidelines
- Always show original + translation
- Include pronunciation guide in parentheses
- Add cultural context if relevant
- Note regional variations

Example:
"Hola" → "Hello" (OH-lah)
Common greeting in all Spanish-speaking countries.

## AI Personality
- Friendly coach, not teacher
- Use emojis sparingly (1-2 per message)
- Encourage practice: "Try using this in a sentence!"
- Never criticize, always encourage
- Celebrate progress: "¡Muy bien!", "Great job!"

## Response Length
- Grammar corrections: 2-3 sentences
- Translations: 1 sentence + context
- General help: 3-4 sentences max
- Vocabulary explanations: Definition + example

## Proactive Suggestions
When user hasn't messaged in 30 seconds:
- Suggest conversation starters
- Offer practice exercises
- Share fun facts about language/culture
```

**File 3: `realtime-chat-architecture.md`**
```markdown
# Real-time Chat Architecture

## Purpose
Guide Firebase/Supabase integration for chat functionality.

## Firebase Structure
```
/rooms/
  /spanish-intermediate/
    /messages/
      /msg_123/
        userId: "user_456"
        username: "lingo_learner_92"
        message: "¡Hola!"
        timestamp: 1234567890
        language: "es"
        isVoice: false
    /users/
      /user_456/
        username: "lingo_learner_92"
        status: "online"
        joinedAt: 1234567890
```

## Message Flow
1. User types message → validate client-side
2. Send to Firebase → /rooms/{roomId}/messages/
3. Firebase broadcasts → all listeners receive
4. Update UI → append to chat window
5. Auto-scroll to bottom

## Presence Detection
- On join: Set user status to "online"
- On disconnect: Firebase onDisconnect() sets "offline"
- Heartbeat: Update timestamp every 30s

## Security Rules (Firebase)
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".write": "auth != null || true",
          ".read": true
        }
      }
    }
  }
}
```

## Offline Handling
- Queue messages locally if offline
- Show "Reconnecting..." indicator
- Sync when connection restored
- Don't lose user input

## Performance
- Limit query to last 50 messages
- Implement virtual scrolling for large chats
- Debounce typing indicators
- Use Firebase indexing for queries
```

**File 4: `ai-buddy-behavior.md`**
```markdown
# AI Buddy Behavior Guidelines

## Purpose
Define AI language coach personality and response patterns.

## System Prompt
```
You are a friendly, encouraging language learning coach helping 
learners improve their Spanish/French/etc. Your role is to:

1. Correct mistakes gently with clear explanations
2. Provide cultural context and nuances
3. Encourage practice and experimentation
4. Celebrate progress, no matter how small
5. Keep responses concise but educational (2-4 sentences)

Always be warm, patient, and enthusiastic. Use emojis occasionally
to make learning fun. Never shame users for mistakes - mistakes 
are learning opportunities!
```

## Response Templates

### Grammar Correction
"[Positive acknowledgment]! The correct form is: [correction]. 
[Brief rule explanation]. [Example sentence]. [Encouragement]"

### Translation Request
"[Word/phrase] means [translation] ([pronunciation]). 
[Usage note or cultural context]."

### Pronunciation Help
"To pronounce [word]:
- Break it down: [syllable breakdown]
- Sounds like: [English approximation]
- Tip: [specific advice]
Listen and repeat: [phonetic spelling]"

### General Question
"[Direct answer]. [Additional helpful info]. [Suggestion for practice]."

## Context Awareness
- Remember user's proficiency level from conversation
- Note repeated mistakes → suggest focused practice
- Track topics user is interested in
- Adapt complexity of explanations

## Proactive Engagement
If user is idle for 60 seconds:
- "Want to practice something new?"
- "Shall we review what you learned today?"
- "Fun fact: [cultural tidbit about language]"

## Boundaries
- Don't translate full paragraphs (encourage user to try first)
- Don't do homework (guide them instead)
- Redirect off-topic conversations back to language learning
- If user is frustrated, acknowledge and suggest break
```

---

### Agent Hooks Setup (Day 1)

**Hook 1: Test Generator**
```javascript
// kiro/hooks/test-generator.hook.js
export default {
  name: 'test-generator',
  trigger: {
    event: 'file.save',
    pattern: 'src/components/**/*.jsx'
  },
  action: async (context) => {
    const componentPath = context.file.path;
    const testPath = componentPath.replace('/components/', '/tests/components/').replace('.jsx', '.test.jsx');
    
    // Generate test file with Kiro
    const testContent = await kiro.generate({
      prompt: `Create comprehensive unit tests for ${componentPath}. 
      Include: rendering tests, user interaction tests, edge cases.
      Use Vitest and React Testing Library.`,
      context: context.file.content
    });
    
    await kiro.writeFile(testPath, testContent);
    console.log(`✅ Generated tests for ${componentPath}`);
  }
};
```

**Hook 2: Translation Validator**
```javascript
// kiro/hooks/translation-validator.hook.js
export default {
  name: 'translation-validator',
  trigger: {
    event: 'file.save',
    pattern: 'src/**/*.{jsx,js}'
  },
  action: async (context) => {
    const content = context.file.content;
    
    // Regex to find hardcoded strings
    const hardcodedStrings = content.match(/['"][^'"]{10,}['"]/g);
    
    if (hardcodedStrings && hardcodedStrings.length > 0) {
      await kiro.warn({
        message: `Found ${hardcodedStrings.length} potentially hardcoded strings`,
        file: context.file.path,
        strings: hardcodedStrings,
        suggestion: 'Consider using translation keys or constants'
      });
    }
  }
};
```

**Hook 3: Accessibility Checker**
```javascript
// kiro/hooks/accessibility-checker.hook.js
export default {
  name: 'accessibility-checker',
  trigger: {
    event: 'file.save',
    pattern: 'src/components/**/*.jsx'
  },
  action: async (context) => {
    const content = context.file.content;
    const issues = [];
    
    // Check for missing alt text on images
    if (/<img/.test(content) && !/alt=/.test(content)) {
      issues.push('Missing alt attributes on <img> tags');
    }
    
    // Check for buttons without aria-label
    if (/<button/.test(content) && !/aria-label=/.test(content)) {
      issues.push('Buttons may need aria-label for screen readers');
    }
    
    // Check for proper heading hierarchy
    const headings = content.match(/<h[1-6]/g);
    if (headings && headings.length > 0) {
      // Validate hierarchy
    }
    
    if (issues.length > 0) {
      await kiro.block({
        message: '🚨 Security issues detected - commit blocked',
        issues: issues
      });
      return false; // Block commit
    }
    
    return true; // Allow commit
  }
};
```

---

### MCP Integration Setup (Day 2)

**Firebase MCP Configuration**
```json
// kiro/mcp/firebase-mcp-config.json
{
  "name": "firebase-mcp",
  "type": "firebase",
  "config": {
    "projectId": "lingo-app-xxx",
    "capabilities": [
      "database-read",
      "database-write",
      "security-rules",
      "schema-analysis"
    ]
  },
  "useCases": [
    "Auto-generate security rules based on data structure",
    "Validate message schema before deploying",
    "Query optimization suggestions",
    "Real-time connection testing"
  ]
}
```

**Usage Example**:
```
# In Kiro chat
You: "Analyze my Firebase message structure and suggest security rules"

Kiro: [Uses Firebase MCP to read your database schema]
"Based on your message structure, here are recommended security rules:
- Users can only delete their own messages
- Rate limit: 10 messages per minute per user
- Message content must be under 500 characters
- Username must match authenticated user

I've generated the rules file in firebase-security-rules.json"
```

---

## 🔐 Security Considerations

### Firebase Security Rules
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          "$messageId": {
            ".write": "!data.exists() || data.child('userId').val() === newData.child('userId').val()",
            ".read": true,
            ".validate": "newData.hasChildren(['userId', 'username', 'message', 'timestamp'])"
          }
        },
        "users": {
          "$userId": {
            ".write": "$userId === newData.child('userId').val()",
            ".read": true
          }
        }
      }
    }
  }
}
```

### API Key Protection
- Store Claude API key in environment variables
- Never commit `.env` files
- Use Vercel environment variables for production
- Implement rate limiting on API calls

### Input Validation
- Sanitize all user input before displaying
- Prevent XSS attacks (React does this by default)
- Validate message length (max 500 chars)
- Filter malicious URLs

---

## 🧪 Testing Strategy

### Unit Tests (Vitest + React Testing Library)
```javascript
// Example: ChatRoomWindow.test.jsx
describe('ChatRoomWindow', () => {
  it('renders chat room with title', () => {
    render(<ChatRoomWindow roomName="Spanish - Intermediate" />);
    expect(screen.getByText('Spanish - Intermediate')).toBeInTheDocument();
  });
  
  it('allows sending messages', async () => {
    render(<ChatRoomWindow />);
    const input = screen.getByPlaceholderText('Type message...');
    await userEvent.type(input, 'Hola');
    await userEvent.click(screen.getByText('Send'));
    expect(mockSendMessage).toHaveBeenCalledWith('Hola');
  });
  
  it('displays received messages in real-time', async () => {
    render(<ChatRoomWindow />);
    act(() => {
      mockFirebase.emit('message', { username: 'user1', message: 'Hello!' });
    });
    expect(await screen.findByText('Hello!')).toBeInTheDocument();
  });
});
```

### Integration Tests
- Test full user flow: enter username → join room → send message
- Test AI Buddy conversation flow
- Test window dragging and resizing
- Test theme switching

### Manual Testing Checklist
- [ ] All windows draggable
- [ ] Windows stack properly (z-index)
- [ ] Messages sync across multiple browser tabs
- [ ] AI responses are helpful and accurate
- [ ] Voice input works in Chrome/Edge
- [ ] Themes switch without breaking layout
- [ ] Mobile responsive (basic support)
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility

---

## 📊 Success Metrics

### Technical Success
- ✅ App loads in < 3 seconds
- ✅ Messages appear in < 500ms after sending
- ✅ AI responses in < 5 seconds
- ✅ No console errors in production
- ✅ 90%+ test coverage on core components

### User Experience Success
- ✅ Users can send first message within 30 seconds of landing
- ✅ AI Buddy provides helpful corrections 90%+ of the time
- ✅ Window dragging feels smooth (60fps)
- ✅ Theme switching is instant

### Hackathon Success
- ✅ Clear demonstration of Kiro usage (hooks, steering, MCP)
- ✅ Unique resurrection of Yahoo Chat
- ✅ Polished, working demo
- ✅ Effective video/documentation

---

## 🎥 Demo Script

### Video Structure (3-5 minutes)

**Scene 1: The Problem (30s)**
"Remember Yahoo Chat? Those were the days of vibrant online communities. But what if we brought that magic back... for language learning?"

**Scene 2: The Solution (30s)**
"Introducing Lingo App - Yahoo Chat resurrected as an AI-powered language learning platform."

**Scene 3: Demo (2-3 min)**
1. Show desktop with themes
2. Open Spanish chat room
3. Send messages, show real-time sync
4. Open AI Buddy
5. Get grammar correction
6. Request translation
7. Show voice message feature
8. Demonstrate window management

**Scene 4: Kiro Usage (1 min)**
"Built with Kiro, I used:
- Agent hooks for automated testing and validation
- Steering docs to teach Kiro about Yahoo Chat UI
- Firebase MCP to generate security rules
- Result: Built in 7 days what would have taken weeks"

**Scene 5: Call to Action (30s)**
"Lingo App proves old ideas can solve new problems. Try it yourself at [link]"

---

## 🚧 Known Limitations & Future Enhancements

### MVP Limitations
- Single chat room (Spanish only)
- No user authentication (username-only)
- No private messaging
- Basic voice support (browser APIs only)
- No message editing/deletion
- No emoji picker
- No file sharing

### Post-Hackathon Enhancements
- Multiple language rooms (French, Japanese, Korean, etc.)
- User authentication with profiles
- Private 1-on-1 chats
- Voice rooms for live conversation practice
- Progress tracking and achievements
- Spaced repetition flashcards
- Weekly challenges and leaderboards
- Mobile app (React Native)
- AI pronunciation scoring
- Cultural exchange events

---

## 📚 Resources & References

### Design Inspiration
- Yahoo Messenger UI screenshots (archive.org)
- Windows XP window chrome
- MSN Messenger nostalgia

### Technical Documentation
- React-rnd: https://github.com/bokuweb/react-rnd
- Firebase Realtime Database: https://firebase.google.com/docs/database
- Claude API: https://docs.anthropic.com/
- Web Speech API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

### Kiro Documentation
- Vibe Coding: https://kiro.dev/docs/vibe-coding
- Agent Hooks: https://kiro.dev/docs/hooks
- Steering Docs: https://kiro.dev/docs/steering
- MCP: https://kiro.dev/docs/mcp

---

## ✅ Pre-Launch Checklist

### Code Quality
- [ ] All components have tests
- [ ] No console.errors in production
- [ ] No hardcoded API keys
- [ ] Security rules deployed
- [ ] Accessibility audit passed
- [ ] Performance optimization complete

### Documentation
- [ ] README.md with setup instructions
- [ ] Kiro usage write-up complete
- [ ] Code comments on complex logic
- [ ] API documentation

### Demo Materials
- [ ] Demo video recorded and edited
- [ ] Screenshots of key features
- [ ] Live demo link working
- [ ] GitHub repo cleaned up

### Submission
- [ ] Hackathon form filled out
- [ ] Video uploaded
- [ ] All required materials submitted
- [ ] Tested on judges' perspective

---

## 🎯 Critical Success Factors

### What Will Make This Win

1. **Nostalgia Factor**: The Yahoo Chat resurrection is unique and memorable
2. **AI Integration**: Shows modern AI can enhance social learning
3. **Polished UI**: Attention to retro detail + smooth UX
4. **Effective Kiro Usage**: Clear demonstration of hooks, steering, MCP
5. **Working Demo**: Fully functional, not just mockups
6. **Clear Value**: Solves real proble