# Project Structure

## Directory Organization

```
lingo-app/
├── src/
│   ├── components/          # React components
│   │   ├── Desktop/        # Desktop environment (Desktop.jsx, Taskbar.jsx)
│   │   ├── Windows/        # Window system components
│   │   └── *.jsx           # Modals and standalone components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # External API integrations
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
└── [config files]          # vite.config.js, eslint.config.js, etc.
```

## Architecture Patterns

### Component Hierarchy

```
App (with providers)
├── ThemeProvider
│   ├── WindowProvider
│   │   └── UserProvider
│   │       └── HomePage (if not authenticated) OR Desktop (if authenticated)
```

### Context Usage

- **ThemeContext** - Theme management (4 themes: retroYahoo, halloween, cyberpunk, cleanModern)
- **WindowContext** - Window state (open, close, focus, minimize windows)
- **UserContext** - User session and authentication state

All contexts export a custom hook (e.g., `useTheme()`, `useWindows()`, `useUser()`) that must be used within their respective providers.

### Custom Hooks Pattern

Custom hooks in `src/hooks/` handle complex logic:
- `useFirebaseChat` - Real-time chat with Firebase
- `usePrivateChat` - Private messaging
- `useSpeechRecognition` - Voice input
- `useVoiceRecorder` - Audio recording
- `useKeyboardShortcuts` - Global keyboard shortcuts
- `usePrivateMessageNotifications` - Notification system

### Service Layer

Services in `src/services/` wrap external APIs:
- `firebase.js` - Firebase SDK wrapper (auth, database operations)
- `auth.js` - Authentication helpers
- `gemini.js` - Google Gemini AI integration

## Component Conventions

### Window Components

All window content components are in `src/components/Windows/`:
- Wrapped by `DraggableWindow.jsx` (base window with title bar, controls)
- Managed by `WindowManager.jsx` (renders all open windows)
- Opened via `WindowContext.openWindow()` with config object

### File Naming

- Components: PascalCase with `.jsx` extension
- Hooks: camelCase starting with `use`, `.js` extension
- Services: camelCase, `.js` extension
- Contexts: PascalCase with `Context` suffix, `.jsx` extension

## State Management

- React Context for global state (theme, windows, user)
- Local component state with `useState` for UI-specific state
- Custom hooks for shared stateful logic
- No external state management library (Redux, Zustand, etc.)

## Data Flow

1. User actions trigger component handlers
2. Handlers call context methods or custom hooks
3. Hooks interact with services (Firebase, Gemini)
4. Services return data or trigger subscriptions
5. State updates cause re-renders
