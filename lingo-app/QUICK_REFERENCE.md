# Lingo App - Quick Reference Card

## 🚀 Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Root component, routing logic |
| `src/components/Desktop/Desktop.jsx` | Main desktop container |
| `src/components/Windows/WindowManager.jsx` | Window orchestration |
| `src/contexts/ThemeContext.jsx` | Theme state management |
| `src/contexts/WindowContext.jsx` | Window state management |
| `src/services/firebase.js` | Firebase integration |
| `src/services/openai.js` | OpenAI integration |
| `.env` | Environment variables |

## 🎨 Themes

```javascript
// Available themes
'retroYahoo'    // Windows XP silver/blue
'halloween'     // Orange/black spooky
'cyberpunk'     // Dark neon
'cleanModern'   // White/blue minimal

// Change theme
setCurrentTheme('retroYahoo')
```

## 🪟 Window Types

```javascript
// Open chat room
openWindow({
  type: 'chatRoom',
  title: 'Spanish - Intermediate Chat',
  defaultPosition: { x: 100, y: 100 },
  defaultSize: { width: 600, height: 500 }
})

// Open AI buddy
openWindow({
  type: 'aiBuddy',
  title: 'AI Language Buddy',
  defaultPosition: { x: 150, y: 150 },
  defaultSize: { width: 500, height: 600 }
})
```

## 🔥 Firebase Structure

```javascript
/rooms/
  /spanish-intermediate/
    /messages/
      /msg_123/
        userId: "user_456"
        username: "lingo_learner_92"
        message: "¡Hola!"
        timestamp: 1234567890
        type: "text"
        language: "es"
    /users/
      /user_456/
        username: "lingo_learner_92"
        status: "online"
        lastSeen: 1234567890
```

## 🤖 OpenAI Integration

```javascript
// Send message to AI
const response = await sendMessageToAI([
  { role: 'user', content: 'Como estas' }
], 'Spanish')

// Mock mode (no API key)
// Returns intelligent mock responses
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + 1` | Open chat room |
| `Ctrl + 2` | Open AI buddy |
| `Ctrl + T` | Cycle themes |
| `Ctrl + /` | Show help |
| `Enter` | Send message |

## 🎣 Custom Hooks

```javascript
// Firebase chat
const { messages, users, isConnected, sendMessage } = 
  useFirebaseChat('room-id', user)

// Speech recognition
const { isListening, transcript, startListening, stopListening } = 
  useSpeechRecognition('es-ES')

// Voice recorder
const { isRecording, audioURL, startRecording, stopRecording } = 
  useVoiceRecorder()

// Keyboard shortcuts
useKeyboardShortcuts([
  { key: 't', ctrl: true, callback: () => {...} }
])
```

## 🔧 Context Usage

```javascript
// Theme
const { theme, currentTheme, setCurrentTheme } = useTheme()

// Windows
const { windows, openWindow, closeWindow, focusWindow } = useWindows()

// User
const { user, login, logout } = useUser()
```

## 🌍 Environment Variables

```bash
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# OpenAI
VITE_OPENAI_API_KEY=
```

## 🐛 Common Issues

### Firebase not connecting
```bash
# Check .env file
# Verify DATABASE_URL includes https://
# Check Firebase console for database status
```

### Voice input not working
```bash
# Only works in Chrome/Edge
# Check microphone permissions
# HTTPS required (localhost OK for dev)
```

### AI not responding
```bash
# Check OPENAI_API_KEY in .env
# Verify OpenAI account has credits
# Check browser console for errors
# Falls back to mock responses if no key
```

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-rnd": "^10.x",
  "lucide-react": "^0.x",
  "firebase": "^10.x"
}
```

## 🎯 Component Props

### DraggableWindow
```javascript
<DraggableWindow
  windowId="window-123"
  title="Chat Room"
  defaultPosition={{ x: 100, y: 100 }}
  defaultSize={{ width: 600, height: 500 }}
  zIndex={100}
  minimized={false}
>
  {children}
</DraggableWindow>
```

## 🔒 Security Rules (Firebase)

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".read": true,
          ".write": true
        },
        "users": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

## 📊 Performance Tips

```javascript
// Limit messages query
const messagesRef = ref(database, 'rooms/spanish/messages')
  .limitToLast(50)

// Debounce typing indicators
const debouncedTyping = debounce(() => {
  updateTypingStatus(true)
}, 300)

// Virtual scrolling for large lists
// Use react-window or react-virtualized
```

## 🎨 Styling Patterns

```javascript
// Inline styles (current approach)
style={{
  background: theme.windowBg,
  border: `2px solid ${theme.windowBorder}`,
  borderRadius: '6px'
}}

// Theme-aware styling
const { theme } = useTheme()
style={{ color: theme.accent }}
```

## 🧪 Testing

```javascript
// Component test
import { render, screen } from '@testing-library/react'
import ChatRoomWindow from './ChatRoomWindow'

test('renders chat room', () => {
  render(<ChatRoomWindow />)
  expect(screen.getByText('Online')).toBeInTheDocument()
})
```

## 📱 Browser APIs Used

```javascript
// Speech Recognition
const SpeechRecognition = 
  window.SpeechRecognition || window.webkitSpeechRecognition

// Media Recorder
navigator.mediaDevices.getUserMedia({ audio: true })

// Local Storage
localStorage.setItem('lingoUser', JSON.stringify(user))
```

## 🚀 Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Set Firebase security rules
- [ ] Add environment variables to hosting platform
- [ ] Test in production mode (`npm run build && npm run preview`)
- [ ] Verify all features work
- [ ] Check browser console for errors
- [ ] Test on multiple browsers
- [ ] Verify mobile responsiveness

## 📞 Quick Links

- [React Docs](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [react-rnd](https://github.com/bokuweb/react-rnd)

---

**Pro Tip:** Keep this file open while developing! 🚀
