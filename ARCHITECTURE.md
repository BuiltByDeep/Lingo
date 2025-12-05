# Lingo App - Architecture Documentation

## 🏗️ Project Structure

```
lingo-app/
├── public/                      # Static assets
├── src/
│   ├── components/             # React components
│   │   ├── Desktop/           # Desktop environment
│   │   │   ├── Desktop.jsx    # Main desktop container
│   │   │   └── Taskbar.jsx    # Bottom taskbar
│   │   ├── Windows/           # Window components
│   │   │   ├── DraggableWindow.jsx    # Base window wrapper
│   │   │   ├── WindowManager.jsx      # Window orchestration
│   │   │   ├── ChatRoomWindow.jsx     # Chat room UI
│   │   │   └── AIBuddyWindow.jsx      # AI assistant UI
│   │   ├── WelcomeModal.jsx   # Username entry
│   │   └── HelpModal.jsx      # Keyboard shortcuts help
│   ├── contexts/              # React Context providers
│   │   ├── ThemeContext.jsx   # Theme management
│   │   ├── WindowContext.jsx  # Window state management
│   │   └── UserContext.jsx    # User session management
│   ├── hooks/                 # Custom React hooks
│   │   ├── useFirebaseChat.js      # Firebase chat integration
│   │   ├── useSpeechRecognition.js # Voice input
│   │   ├── useVoiceRecorder.js     # Audio recording
│   │   └── useKeyboardShortcuts.js # Keyboard shortcuts
│   ├── services/              # External service integrations
│   │   ├── firebase.js        # Firebase SDK wrapper
│   │   └── openai.js          # OpenAI API wrapper
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables
├── .env.example               # Environment template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
├── README.md                  # Quick start guide
├── SETUP.md                   # Detailed setup instructions
├── FEATURES.md                # Feature documentation
└── ARCHITECTURE.md            # This file
```

## 🔄 Data Flow

### User Authentication Flow
```
User enters username
    ↓
UserContext stores user data
    ↓
localStorage persists session
    ↓
Desktop loads with user context
```

### Chat Message Flow
```
User types message
    ↓
ChatRoomWindow.handleSend()
    ↓
useFirebaseChat.sendMessage()
    ↓
Firebase Realtime Database
    ↓
Firebase broadcasts to all clients
    ↓
useFirebaseChat subscription receives update
    ↓
ChatRoomWindow re-renders with new messages
```

### AI Conversation Flow
```
User sends message to AI
    ↓
AIBuddyWindow.handleSend()
    ↓
openai.sendMessageToAI()
    ↓
OpenAI API (or mock response)
    ↓
Response returned
    ↓
AIBuddyWindow displays response
```

### Window Management Flow
```
User clicks "Start" → "Spanish Chat Room"
    ↓
Taskbar.handleOpenChatRoom()
    ↓
WindowContext.openWindow()
    ↓
WindowManager receives new window
    ↓
DraggableWindow renders with ChatRoomWindow content
```

## 🎨 Component Architecture

### Context Providers Hierarchy
```jsx
<ThemeProvider>
  <WindowProvider>
    <UserProvider>
      <App>
        {user ? <Desktop /> : <WelcomeModal />}
      </App>
    </UserProvider>
  </WindowProvider>
</ThemeProvider>
```

### Desktop Component Tree
```
Desktop
├── WindowManager
│   ├── DraggableWindow (Chat Room)
│   │   └── ChatRoomWindow
│   │       ├── Messages List
│   │       ├── Message Input
│   │       └── User List
│   └── DraggableWindow (AI Buddy)
│       └── AIBuddyWindow
│           ├── Conversation View
│           ├── Quick Actions
│           └── Message Input
├── Taskbar
│   ├── Start Menu
│   ├── Window Tabs
│   ├── Theme Switcher
│   ├── Help Button
│   └── Clock
└── HelpModal (conditional)
```

## 🔌 External Integrations

### Firebase Realtime Database

**Structure:**
```json
{
  "rooms": {
    "spanish-intermediate": {
      "messages": {
        "msg_123": {
          "userId": "user_456",
          "username": "lingo_learner_92",
          "message": "¡Hola!",
          "timestamp": 1234567890,
          "type": "text",
          "language": "es"
        }
      },
      "users": {
        "user_456": {
          "username": "lingo_learner_92",
          "status": "online",
          "lastSeen": 1234567890
        }
      }
    }
  }
}
```

**Operations:**
- `sendMessage()`: Push new message to room
- `subscribeToMessages()`: Listen for message updates
- `updateUserPresence()`: Set user online/offline
- `subscribeToUsers()`: Listen for user status changes

### OpenAI API

**Request Format:**
```javascript
{
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a language coach...' },
    { role: 'user', content: 'Como estas' },
    { role: 'assistant', content: 'Great attempt! ...' }
  ],
  temperature: 0.7,
  max_tokens: 500
}
```

**Response Handling:**
- Success: Extract `choices[0].message.content`
- Error: Fallback to mock response
- No API key: Use mock responses

### Web Speech API

**Browser Support:**
- Chrome/Edge: Full support
- Firefox/Safari: Limited/none

**Usage:**
```javascript
const recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.start();
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Use transcript
};
```

## 🎯 State Management

### Theme State (ThemeContext)
```javascript
{
  currentTheme: 'retroYahoo',
  theme: {
    wallpaper: 'linear-gradient(...)',
    accent: '#5B7FA6',
    windowBg: '#ECE9D8',
    // ... more theme properties
  },
  setCurrentTheme: (themeName) => { ... }
}
```

### Window State (WindowContext)
```javascript
{
  windows: [
    {
      id: 'window-123',
      type: 'chatRoom',
      title: 'Spanish - Intermediate Chat',
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 600, height: 500 },
      zIndex: 100,
      minimized: false
    }
  ],
  activeWindowId: 'window-123',
  openWindow: (config) => { ... },
  closeWindow: (id) => { ... },
  focusWindow: (id) => { ... },
  minimizeWindow: (id) => { ... }
}
```

### User State (UserContext)
```javascript
{
  user: {
    userId: 'user_123',
    username: 'lingo_learner_92',
    status: 'online',
    joinedAt: 1234567890
  },
  login: (username) => { ... },
  logout: () => { ... }
}
```

## 🔒 Security Considerations

### Current Implementation
- Username-only authentication (no passwords)
- Public Firebase rules (read/write for all)
- Client-side API key storage
- No rate limiting
- No input sanitization

### Production Requirements
1. **Authentication**: Implement Firebase Auth
2. **Authorization**: Secure Firebase rules
3. **API Keys**: Move to backend/serverless functions
4. **Rate Limiting**: Prevent spam and abuse
5. **Input Validation**: Sanitize all user input
6. **XSS Prevention**: Already handled by React
7. **CORS**: Configure properly for production

### Recommended Firebase Rules (Production)
```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".read": "auth != null",
          ".write": "auth != null && !data.exists()",
          "$messageId": {
            ".validate": "newData.hasChildren(['userId', 'username', 'message', 'timestamp'])",
            ".write": "auth.uid === newData.child('userId').val()"
          }
        },
        "users": {
          ".read": "auth != null",
          "$userId": {
            ".write": "auth.uid === $userId"
          }
        }
      }
    }
  }
}
```

## 🚀 Performance Optimization

### Current Optimizations
- React 19 automatic batching
- Vite's fast HMR
- Firebase real-time subscriptions (efficient)
- Lazy loading (planned)

### Future Optimizations
1. **Virtual Scrolling**: For large message lists
2. **Message Pagination**: Load messages in chunks
3. **Image Lazy Loading**: When file sharing is added
4. **Code Splitting**: Split routes and heavy components
5. **Service Worker**: Offline support
6. **CDN**: Static asset delivery
7. **Memoization**: React.memo for expensive components

## 🧪 Testing Strategy

### Unit Tests (Planned)
- Component rendering tests
- Hook behavior tests
- Service function tests
- Context provider tests

### Integration Tests (Planned)
- User flow: Login → Chat → Send message
- Window management: Open → Drag → Close
- AI conversation flow
- Theme switching

### E2E Tests (Planned)
- Full user journey
- Multi-user chat sync
- Cross-browser compatibility

## 📦 Build & Deployment

### Development
```bash
npm run dev
# Vite dev server with HMR
# http://localhost:5173
```

### Production Build
```bash
npm run build
# Output: dist/
# Optimized, minified, tree-shaken
```

### Deployment Targets
- **Vercel**: Recommended (zero-config)
- **Netlify**: Alternative
- **Firebase Hosting**: Good for Firebase projects
- **AWS S3 + CloudFront**: Enterprise option

### Environment Variables
Must be set in deployment platform:
- `VITE_FIREBASE_*`: All Firebase config
- `VITE_OPENAI_API_KEY`: OpenAI key

## 🔄 Future Architecture Changes

### Planned Improvements
1. **Backend API**: Move sensitive operations to server
2. **WebSocket**: Consider Socket.io for more control
3. **State Management**: Consider Zustand/Redux for complex state
4. **TypeScript**: Add type safety
5. **Monorepo**: Separate web/mobile/backend
6. **Microservices**: Split AI, chat, user services

### Scalability Considerations
- Firebase scales automatically
- OpenAI has rate limits (consider caching)
- Consider Redis for session management
- Load balancing for backend API
- CDN for static assets

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [OpenAI API](https://platform.openai.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [react-rnd](https://github.com/bokuweb/react-rnd)
