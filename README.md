# 🌍 Lingo - AI-Powered Language Learning Platform

> A nostalgic Yahoo! Chat reimagined for modern language learning with AI assistance, real-time chat, and educational games.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange) ![Gemini](https://img.shields.io/badge/Google-Gemini-green)

---

## 🎯 Project Overview

Lingo combines the nostalgic aesthetics of early-2000s Yahoo! Chat with modern AI capabilities to create an engaging language learning platform. Built with React 19, Firebase, and Google Gemini AI, it offers real-time chat rooms, AI-powered language assistance, and educational games—all in a beautiful Windows XP-inspired desktop environment.

### ✨ Key Features

- 🤖 **AI Language Buddy** - 7 learning modes (Learn, Chat, Translate, Grammar, Pronunciation, Practice, Vocab) for 8 languages
- 💬 **Real-time Chat Rooms** - Practice with native speakers and learners worldwide
- 🎮 **Educational Games** - Halloween Hangman and Word Scramble with difficulty levels
- 🖥️ **Desktop Environment** - Draggable/resizable windows with 4 nostalgic themes
- 🗣️ **Voice Input** - Practice pronunciation with speech-to-text
- 🔐 **Firebase Authentication** - Secure email/password and Google sign-in
- 💌 **Private Messaging** - 1-on-1 conversations with voice messages

---

## 🚀 Quick Start

### For Users Cloning This Repository

**⚠️ Important**: This repository does NOT include API keys. You need to create your own (free) accounts:

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Lingoapp/lingo-app
   npm install
   ```

2. **Follow the setup guide**: [SETUP_FROM_GITHUB.md](./SETUP_FROM_GITHUB.md)
   - Get Google Gemini API key (free tier: 60 requests/min)
   - Create Firebase project (free tier available)
   - Configure environment variables

3. **Run the app**
   ```bash
   npm run dev
   ```

**📖 Complete Setup Instructions**: See [SETUP_FROM_GITHUB.md](./SETUP_FROM_GITHUB.md) for detailed step-by-step guide.

---

## 📁 Repository Structure

```
Lingoapp/
├── .kiro/                          # Kiro AI specs and steering files
│   ├── specs/                      # Feature specifications
│   │   ├── ai-language-buddy/      # AI Buddy requirements, design, tasks
│   │   ├── halloween-hangman/      # Hangman game specs
│   │   ├── word-scramble-game/     # Word scramble specs
│   │   └── join-room-selector/     # Room selector specs
│   └── steering/                   # Development steering files
│       ├── product.md              # Product vision
│       ├── structure.md            # Architecture patterns
│       ├── tech.md                 # Tech stack
│       └── ai-language-buddy.md    # AI Buddy implementation guide
├── lingo-app/                      # Main application
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── Desktop/            # Desktop environment
│   │   │   ├── Windows/            # Window components
│   │   │   ├── HalloweenHangman/   # Hangman game
│   │   │   └── WordScramble/       # Word scramble game
│   │   ├── contexts/               # React Context providers
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API integrations (Firebase, Gemini)
│   │   ├── data/                   # Game data and word banks
│   │   └── utils/                  # Utility functions
│   ├── public/                     # Static assets
│   ├── .env.example                # Environment template (SAFE)
│   ├── .env                        # Your API keys (NEVER COMMITTED)
│   └── [documentation files]
├── SETUP_FROM_GITHUB.md            # Setup guide for cloning
├── KIRO_USAGE_REPORT.md            # How Kiro AI was used
└── README.md                       # This file
```

---

## 🛠️ Built With Kiro AI

This project was built using **Kiro AI** as a development assistant. The `.kiro` folder contains:

### Specifications (`.kiro/specs/`)
- **Requirements documents** - User stories and acceptance criteria
- **Design documents** - Architecture patterns and correctness properties
- **Task lists** - Incremental implementation steps

### Steering Files (`.kiro/steering/`)
- **Product vision** - Target users and core features
- **Architecture patterns** - Component conventions and state management
- **Tech stack** - Technologies and build commands
- **Implementation guides** - Feature-specific development guides

**📖 Learn More**: See [KIRO_USAGE_REPORT.md](./KIRO_USAGE_REPORT.md) for detailed information about how Kiro was used in development.

---

## 🎨 Features in Detail

### AI Language Buddy
- **8 Languages**: Spanish, French, Japanese, Korean, German, Italian, Portuguese, Chinese
- **7 Learning Modes**:
  - 📚 Learn - Structured step-by-step lessons
  - 💬 Chat - Conversational practice
  - 🔄 Translate - Multi-version translations
  - ✏️ Grammar - Correction and explanation
  - 🗣️ Pronunciation - Phonetic guidance and scoring
  - 🎭 Practice - Scenario-based role-play
  - 📖 Vocab - Vocabulary building and quizzes
- **Simple Mode** - Beginner-friendly teaching with emojis
- **Bilingual Format** - All responses include English translations

### Real-time Chat
- Multi-language chat rooms
- User presence tracking
- Message history
- Text formatting (bold, italic, code blocks)
- Voice messages
- Private 1-on-1 messaging

### Educational Games
- **Halloween Hangman** - Spooky word-guessing with sound effects
- **Word Scramble** - Timed challenges with 3 difficulty levels

### Desktop Environment
- **4 Themes**: Retro Yahoo, Halloween, Cyberpunk, Clean Modern
- **Draggable Windows** - Classic Yahoo Messenger style
- **Taskbar** - Windows XP-inspired with start menu
- **Keyboard Shortcuts** - Quick access to all features

---

## 🔒 Security & Privacy

### What's Included in This Repository:
- ✅ Complete source code
- ✅ Documentation
- ✅ `.kiro` specs and steering files
- ✅ `.env.example` template with placeholders

### What's NOT Included (For Security):
- ❌ `.env` file with actual API keys
- ❌ Firebase credentials
- ❌ Gemini API keys
- ❌ `node_modules` (regenerated with `npm install`)

### Why Each User Needs Their Own Credentials:
1. **Security** - Your credentials control access to YOUR database
2. **Isolation** - Each person's data is separate
3. **Free Tier** - Everyone gets their own free tier limits
4. **Control** - You manage your own security rules

---

## 📚 Documentation

- **[SETUP_FROM_GITHUB.md](./SETUP_FROM_GITHUB.md)** - Complete setup guide for cloning
- **[lingo-app/README.md](./lingo-app/README.md)** - Detailed feature documentation
- **[lingo-app/SETUP.md](./lingo-app/SETUP.md)** - Development setup guide
- **[lingo-app/FEATURES.md](./lingo-app/FEATURES.md)** - All features explained
- **[lingo-app/ARCHITECTURE.md](./lingo-app/ARCHITECTURE.md)** - Technical architecture
- **[KIRO_USAGE_REPORT.md](./KIRO_USAGE_REPORT.md)** - Kiro AI development process

---

## 🧪 Tech Stack

- **Frontend**: React 19, Vite 5
- **Backend**: Firebase (Authentication, Realtime Database)
- **AI**: Google Gemini AI (@google/generative-ai)
- **UI**: react-rnd (draggable windows), Lucide React (icons)
- **Voice**: Web Speech API (browser-native)

---

## 🎯 Use Cases

### For Language Learners
- Practice writing in target language
- Get instant AI feedback on grammar
- Learn pronunciation with voice input
- Play educational games
- Chat with other learners

### For Teachers
- Monitor student conversations
- Assign practice exercises
- Track progress
- Provide resources

### For Language Exchange
- Find practice partners worldwide
- Mutual learning opportunities
- Schedule practice sessions

---

## 🤝 Contributing

This project was built as part of a competition showcasing Kiro AI development. Feel free to:
- Fork the repository
- Create your own features
- Submit pull requests
- Open issues for bugs or suggestions

---

## 📄 License

MIT License - feel free to use and modify for your own projects!

---

## 🌟 Acknowledgments

- Built with **Kiro AI** as development assistant
- Powered by **Google Gemini AI** for language assistance
- Real-time features by **Firebase**
- Inspired by nostalgic Yahoo! Chat and Windows XP aesthetics

---

## 📞 Support

If you encounter issues:
1. Check [SETUP_FROM_GITHUB.md](./SETUP_FROM_GITHUB.md) troubleshooting section
2. Review browser console for error messages
3. Verify all environment variables are set correctly
4. Open a GitHub issue with details

---

**Made with ❤️ for language learners worldwide**

🌍 Learn. Chat. Play. Connect.
