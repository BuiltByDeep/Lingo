# 🌍 Lingo - Language Learning Chat Platform

A nostalgic resurrection of Yahoo! Chat, reimagined for global language learning with modern AI capabilities. Practice languages in real-time chat rooms, get instant AI feedback, play educational games, and connect with learners worldwide—all in a beautiful retro-themed desktop environment.

![Lingo App](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange) ![Gemini](https://img.shields.io/badge/Google-Gemini-green)

---

## ✨ Features

### 🤖 AI Language Buddy (Powered by Google Gemini)
- **7 Learning Modes**: Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab
- **8 Languages**: Spanish, French, Japanese, Korean, German, Italian, Portuguese, Chinese
- **Voice Input**: Practice pronunciation with speech-to-text
- **Bilingual Format**: Every response includes English translations
- **Simple Mode**: Beginner-friendly explanations with emojis
- **Real-time Feedback**: Instant grammar corrections and suggestions

### 💬 Real-time Chat Rooms
- **Multi-language Rooms**: Practice with native speakers and learners
- **Private Messaging**: 1-on-1 conversations with voice messages
- **Text Formatting**: Bold, italic, underline, strikethrough, code blocks
- **Voice Messages**: Record and send audio messages
- **User Presence**: See who's online in real-time
- **Message History**: Persistent chat with Firebase Realtime Database

### 🎮 Educational Games
- **Halloween Hangman**: Spooky word-guessing game with sound effects
- **Word Scramble Battle**: Timed word unscrambling with difficulty levels
- **Leaderboards**: Track high scores and compete with friends

### 🖥️ Desktop Environment
- **Draggable Windows**: Classic Yahoo Messenger-style interface
- **4 Themes**: Retro Yahoo, Halloween, Cyberpunk, Clean Modern
- **Taskbar**: Windows XP-inspired with start menu and system tray
- **Keyboard Shortcuts**: Quick access to all features
- **Multi-window**: Open multiple chat rooms and tools simultaneously

### 🔐 Authentication
- **Firebase Auth**: Secure email/password and Google sign-in
- **User Profiles**: Persistent user data and preferences
- **Session Management**: Stay logged in across sessions

---

## 🚀 Quick Start

### Prerequisites

Before you begin, you'll need:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Google Gemini API Key** (required for AI features)
- **Firebase Account** (free tier works perfectly)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd lingo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Now edit `.env` with your actual credentials (see detailed setup below).

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173` and start learning!

---

## 🔑 Required API Keys Setup

### Google Gemini API Key (REQUIRED)

The AI Language Buddy requires a Google Gemini API key to function. Follow these steps:

#### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select **"Create API key in new project"** (or use existing project)
5. Copy the generated API key (starts with `AIza...`)

#### Step 2: Add to Environment Variables

Open your `.env` file and add:

```env
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

⚠️ **Important Notes:**
- The Gemini API has a **free tier** with generous limits (60 requests per minute)
- Keep your API key secret—never commit it to version control
- The app will not work without this key (AI Buddy will show an error)
- You can monitor usage at [Google AI Studio](https://aistudio.google.com/)

#### Gemini API Pricing (as of 2024)

- **Free Tier**: 60 requests/minute, 1,500 requests/day
- **Paid Tier**: $0.00025 per 1K characters (extremely affordable)
- Perfect for personal projects and small teams

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it (e.g., "lingo-app")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. (Optional) Enable **Google** sign-in method

### Step 3: Enable Realtime Database

1. Go to **Build → Realtime Database**
2. Click **"Create Database"**
3. Choose a location (closest to your users)
4. Start in **Test mode** (we'll secure it later)
5. Click **"Enable"**

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click the web icon `</>`
4. Register app with a nickname (e.g., "Lingo Web")
5. Copy the `firebaseConfig` object values

### Step 5: Add to Environment Variables

Update your `.env` file with Firebase credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

### Step 6: Configure Security Rules

In Firebase Console, go to **Realtime Database → Rules** and replace with:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".read": "auth != null",
          ".write": "auth != null",
          ".indexOn": ["timestamp"]
        },
        "users": {
          ".read": "auth != null",
          ".write": "auth != null"
        }
      }
    },
    "privateChats": {
      "$chatId": {
        ".read": "auth != null && ($chatId.contains(auth.uid))",
        ".write": "auth != null && ($chatId.contains(auth.uid))",
        ".indexOn": ["timestamp"]
      }
    },
    "users": {
      "$userId": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $userId"
      }
    }
  }
}
```

Click **"Publish"** to save the rules.

---

## 📁 Project Structure

```
lingo-app/
├── src/
│   ├── components/
│   │   ├── Desktop/              # Desktop environment
│   │   │   ├── Desktop.jsx       # Main desktop component
│   │   │   └── Taskbar.jsx       # Windows XP-style taskbar
│   │   ├── Windows/              # Window components
│   │   │   ├── AIBuddyWindow.jsx         # AI Language Buddy
│   │   │   ├── ChatRoomWindow.jsx        # Public chat rooms
│   │   │   ├── PrivateChatWindow.jsx     # Private messaging
│   │   │   ├── JoinRoomWindow.jsx        # Room selector
│   │   │   ├── HalloweenHangmanWindow.jsx # Hangman game
│   │   │   ├── WordScrambleWindow.jsx    # Word scramble game
│   │   │   └── DraggableWindow.jsx       # Base window component
│   │   ├── HalloweenHangman/     # Hangman game components
│   │   ├── WordScramble/         # Word scramble components
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── SignInModal.jsx       # Authentication modals
│   │   └── SignUpModal.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx      # Theme management
│   │   ├── WindowContext.jsx     # Window state management
│   │   └── UserContext.jsx       # User authentication state
│   ├── hooks/
│   │   ├── useFirebaseChat.js    # Real-time chat hook
│   │   ├── usePrivateChat.js     # Private messaging hook
│   │   ├── useSpeechRecognition.js # Voice input hook
│   │   ├── useVoiceRecorder.js   # Audio recording hook
│   │   ├── useHalloweenHangman.js # Hangman game logic
│   │   └── useWordScrambleGame.js # Word scramble logic
│   ├── services/
│   │   ├── firebase.js           # Firebase SDK wrapper
│   │   ├── auth.js               # Authentication helpers
│   │   ├── gemini.js             # Google Gemini AI integration
│   │   └── wordBankService.js    # Game word data
│   ├── data/
│   │   ├── halloweenWords.js     # Hangman word lists
│   │   └── wordBankData.js       # Scramble word lists
│   ├── utils/
│   │   └── gameLogic.js          # Game utility functions
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── .env                          # Environment variables (create this!)
├── .env.example                  # Environment template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

---

## 🎮 How to Use

### Getting Started

1. **Sign Up**: Create an account with email/password or Google
2. **Explore Desktop**: You'll see a Windows XP-style desktop with taskbar
3. **Open Windows**: Click the **Start** button to access features

### Using AI Language Buddy

1. Click **Start → AI Language Buddy**
2. Select your target language (Spanish, French, Japanese, etc.)
3. Choose a learning mode:
   - **📚 Learn**: Step-by-step lessons
   - **💬 Chat**: Conversational practice
   - **🔄 Translate**: Get translations with context
   - **✏️ Grammar**: Correct your sentences
   - **🗣️ Pronunciation**: Practice speaking
   - **🎭 Practice**: Role-play scenarios
   - **📖 Vocab**: Build vocabulary
4. Toggle **Simple Mode** (👶) for beginner-friendly explanations
5. Use the **microphone button** for voice input (Chrome/Edge only)

### Joining Chat Rooms

1. Click **Start → Join Room**
2. Select a language room (Spanish, French, etc.)
3. Start chatting with other learners
4. Use text formatting toolbar for rich messages
5. Click user names to start private chats

### Playing Games

1. **Halloween Hangman**: Click **Start → Halloween Hangman**
   - Guess letters to reveal the word
   - 6 wrong guesses and the monster appears!
   - Spooky sound effects included

2. **Word Scramble**: Click **Start → Word Scramble**
   - Choose difficulty level (Easy/Medium/Hard)
   - Unscramble words before time runs out
   - Earn points and climb the leaderboard

### Keyboard Shortcuts

- `Ctrl + 1` - Open Spanish Chat Room
- `Ctrl + 2` - Open AI Language Buddy
- `Ctrl + 3` - Open Join Room selector
- `Ctrl + T` - Cycle through themes
- `Ctrl + /` - Show keyboard shortcuts help
- `Enter` - Send message (in chat windows)

---

## 🎨 Themes

Switch between 4 beautiful themes by clicking the palette icon in the taskbar:

1. **Retro Yahoo** - Classic Windows XP silver/blue aesthetic
2. **Halloween** - Spooky orange/black with pumpkins
3. **Cyberpunk** - Dark theme with neon accents
4. **Clean Modern** - Minimalist white/blue design

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

### Tech Stack

- **React 19** - UI framework with hooks and context
- **Vite 5** - Lightning-fast build tool and dev server
- **Firebase** - Authentication and Realtime Database
- **Google Gemini AI** - AI language assistance via @google/generative-ai
- **react-rnd** - Draggable and resizable windows
- **Lucide React** - Beautiful icon library
- **Web Speech API** - Browser-native voice input

### Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in client code via `import.meta.env`.

Required variables:
- `VITE_GEMINI_API_KEY` - Google Gemini API key (REQUIRED)
- `VITE_FIREBASE_*` - Firebase configuration (7 variables)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add environment variables in **Settings → Environment Variables**
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and import your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in **Site settings → Environment variables**

### Important: Environment Variables in Production

Make sure to add ALL environment variables from your `.env` file to your hosting platform:
- Add them for all environments (Production, Preview, Development)
- Never commit `.env` to version control
- Use your hosting platform's environment variable management

---

## 🔒 Security Best Practices

### For Development

- Never commit `.env` file to Git (it's in `.gitignore`)
- Use test mode Firebase rules for quick setup
- Keep API keys secret

### For Production

1. **Update Firebase Security Rules** (see Step 6 above)
2. **Enable Firebase App Check** to prevent abuse
3. **Rate Limit API Calls** to prevent excessive usage
4. **Validate User Input** on both client and server
5. **Sanitize Messages** to prevent XSS attacks
6. **Use HTTPS** (automatic on Vercel/Netlify)
7. **Monitor API Usage** in Google AI Studio and Firebase Console

---

## 🐛 Troubleshooting

### AI Buddy Not Working

**Problem**: AI Buddy shows error or doesn't respond

**Solutions**:
- Verify `VITE_GEMINI_API_KEY` is set correctly in `.env`
- Check you have a valid Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure you haven't exceeded free tier limits (60 requests/minute)
- Check browser console for error messages
- Restart dev server after changing `.env`

### Firebase Connection Issues

**Problem**: Chat messages not syncing or authentication failing

**Solutions**:
- Verify all `VITE_FIREBASE_*` variables are set correctly
- Check `VITE_FIREBASE_DATABASE_URL` includes `https://`
- Ensure Realtime Database is enabled in Firebase Console
- Verify security rules are published
- Check Firebase Console for error logs

### Voice Input Not Working

**Problem**: Microphone button doesn't work

**Solutions**:
- Voice input only works in Chrome and Edge browsers
- Allow microphone permissions when prompted
- HTTPS is required for production (localhost works for dev)
- Check browser console for permission errors

### Build Errors

**Problem**: `npm run build` fails

**Solutions**:
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Ensure Node.js version is 18 or higher
- Check for ESLint errors with `npm run lint`
- Verify all imports are correct

---

## 📚 Additional Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup guide with screenshots
- **[FEATURES.md](./FEATURES.md)** - Complete feature documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture overview
- **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)** - Firebase Auth setup
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase configuration guide
- **[GAMES.md](./GAMES.md)** - Game mechanics and implementation
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick reference for developers

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Keep commits focused and descriptive

---

## 📄 License

MIT License - feel free to use and modify for your own projects!

---

## 🌟 Acknowledgments

- Inspired by the nostalgic Yahoo! Chat and Windows XP aesthetics
- Powered by Google Gemini AI for intelligent language assistance
- Built with modern React and Firebase for real-time collaboration
- Icons by Lucide React

---

## 📞 Support

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review the browser console for error messages
3. Verify all environment variables are set correctly
4. Check Firebase and Gemini API service status
5. Open an issue on GitHub with details

---

## 🎯 Roadmap

### Coming Soon
- [ ] More language rooms (Arabic, Russian, Hindi)
- [ ] AI conversation scoring and feedback
- [ ] Spaced repetition flashcard system
- [ ] Weekly challenges and achievements
- [ ] Mobile app (React Native)
- [ ] Voice rooms for live conversation
- [ ] User profiles with learning statistics
- [ ] Cultural exchange events

---

**Happy Language Learning! 🌍✨**

Made with ❤️ for language learners worldwide
