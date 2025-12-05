# Tech Stack

## Core Technologies

- **React 19** - UI framework with hooks and context
- **Vite** - Build tool and dev server
- **Firebase** - Authentication and Realtime Database
- **Google Gemini AI** - AI language assistance (via @google/generative-ai)
- **react-rnd** - Draggable and resizable windows
- **Lucide React** - Icon library

## Build System

Vite with React plugin, ESLint for linting.

### Common Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production (output: dist/)
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## Environment Configuration

Required environment variables (see `.env.example`):

- `VITE_FIREBASE_*` - Firebase configuration (API key, auth domain, database URL, etc.)
- `VITE_GEMINI_API_KEY` - Google Gemini API key for AI features

Environment variables must be prefixed with `VITE_` to be accessible in client code via `import.meta.env`.

## Browser APIs

- **Web Speech API** - Voice input (Chrome/Edge only)
- **MediaRecorder API** - Voice recording

## Code Style

- ESLint configuration with React hooks and React Refresh plugins
- ECMAScript 2020+ features
- Unused variables allowed if they match pattern `^[A-Z_]` (constants)
