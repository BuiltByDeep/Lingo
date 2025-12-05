# 🚀 Setup Guide - Running Lingo App from GitHub

This guide will help you set up and run the Lingo app after cloning from GitHub.

## ⚠️ Important: You Need Your Own API Keys

This repository does NOT include API keys for security reasons. You'll need to:
1. Create your own Firebase project (free)
2. Get your own Google Gemini API key (free tier available)

Don't worry - it's quick and easy! Follow the steps below.

---

## 📋 Prerequisites

- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- A Google account (for Firebase and Gemini API)
- Git installed

---

## 🔧 Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-github-repo-url>
cd Lingoapp
cd lingo-app
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (React, Vite, Firebase, etc.)

### 3. Set Up Google Gemini API Key (REQUIRED)

The AI Language Buddy requires a Gemini API key.

#### Get Your Gemini API Key:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Select **"Create API key in new project"** (or use existing)
5. Copy the generated API key (starts with `AIza...`)

**Note**: The free tier includes 60 requests/minute - perfect for testing!

### 4. Set Up Firebase (REQUIRED)

The app uses Firebase for authentication and real-time chat.

#### Create Firebase Project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it (e.g., "my-lingo-app")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

#### Enable Authentication:

1. In Firebase Console, go to **Build → Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. (Optional) Enable **Google** sign-in method

#### Enable Realtime Database:

1. Go to **Build → Realtime Database**
2. Click **"Create Database"**
3. Choose a location (closest to you)
4. Start in **Test mode** (we'll secure it later)
5. Click **"Enable"**

#### Get Firebase Configuration:

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click the web icon `</>`
4. Register app with a nickname (e.g., "Lingo Web")
5. Copy the `firebaseConfig` values

#### Set Firebase Security Rules:

1. In Realtime Database, go to **Rules** tab
2. Replace with these rules:

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

3. Click **"Publish"**

### 5. Create Your .env File

Copy the example environment file:

```bash
cp .env.example .env
```

Now edit `.env` with your actual credentials:

```env
# Firebase Configuration (from step 4)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# Google Gemini Configuration (from step 3)
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ IMPORTANT**: 
- Replace ALL placeholder values with your actual credentials
- NEVER commit the `.env` file to Git (it's already in `.gitignore`)
- Keep your API keys secret!

### 6. Run the Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:5173`

---

## ✅ Verify Everything Works

### Test Authentication:
1. Click "Sign Up" on the homepage
2. Create an account with email/password
3. You should be redirected to the desktop environment

### Test Chat Rooms:
1. Click **Start → Join Room**
2. Select a language room (e.g., Spanish)
3. Send a message
4. Open another browser window (incognito mode)
5. Sign in with a different account
6. Join the same room
7. Messages should sync in real-time!

### Test AI Language Buddy:
1. Click **Start → AI Language Buddy**
2. Select a language (e.g., Korean)
3. Type a message like "Hello"
4. You should get a response in Korean with English translation

### Test Games:
1. Click **Start → Halloween Hangman**
2. Try guessing letters
3. Click **Start → Word Scramble**
4. Select difficulty and play

---

## 🐛 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check your `VITE_FIREBASE_API_KEY` in `.env`
- Make sure you copied it correctly from Firebase Console
- Restart the dev server after changing `.env`

### "AI Buddy not responding"
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Check you haven't exceeded free tier limits (60 requests/minute)
- Check browser console for error messages

### "Messages not syncing"
- Verify Firebase Realtime Database is enabled
- Check security rules are published
- Make sure both users are authenticated
- Check `VITE_FIREBASE_DATABASE_URL` includes `https://`

### "Voice input not working"
- Voice input only works in Chrome and Edge browsers
- Allow microphone permissions when prompted
- HTTPS is required for production (localhost works for dev)

### Changes to .env not taking effect
- Restart the dev server (`Ctrl+C` then `npm run dev`)
- Clear browser cache
- Check for typos in variable names (must start with `VITE_`)

---

## 📚 Additional Documentation

- **[README.md](./lingo-app/README.md)** - Complete feature overview
- **[SETUP.md](./lingo-app/SETUP.md)** - Detailed setup guide
- **[FEATURES.md](./lingo-app/FEATURES.md)** - All features explained
- **[KIRO_USAGE_REPORT.md](./KIRO_USAGE_REPORT.md)** - How Kiro was used to build this

---

## 🎮 Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production (output: dist/)
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🔒 Security Notes

### What's Safe to Share:
- ✅ Source code
- ✅ `.env.example` file (has placeholders)
- ✅ Documentation
- ✅ `.kiro` folder (specs and steering files)

### What's NEVER Shared:
- ❌ `.env` file (contains your actual API keys)
- ❌ `node_modules` folder (too large, regenerated with `npm install`)
- ❌ `dist` folder (build output, regenerated with `npm run build`)

### Why Each Person Needs Their Own Firebase:
1. **Security**: Your Firebase credentials control access to YOUR database
2. **Isolation**: Each person's data is separate
3. **Free Tier**: Everyone gets their own free tier limits
4. **Control**: You control your own security rules and data

---

## 💡 Tips for Success

1. **Use Test Mode First**: Start with Firebase test mode rules, secure later
2. **Check Console**: Browser console shows helpful error messages
3. **Read Error Messages**: They usually tell you exactly what's wrong
4. **Free Tiers Are Generous**: Both Firebase and Gemini have great free tiers
5. **Ask for Help**: Check GitHub issues if you get stuck

---

## 🌟 What's Included in This Repo

- ✅ Complete source code
- ✅ All React components
- ✅ Firebase integration code
- ✅ Gemini AI integration code
- ✅ Game implementations
- ✅ Documentation
- ✅ `.kiro` folder with specs and steering files
- ✅ `.env.example` template
- ❌ API keys (you need to create your own)

---

## 🎯 Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Get Gemini API key from Google AI Studio
- [ ] Create Firebase project
- [ ] Enable Firebase Authentication (Email/Password)
- [ ] Enable Firebase Realtime Database
- [ ] Set Firebase security rules
- [ ] Copy `.env.example` to `.env`
- [ ] Add your API keys to `.env`
- [ ] Run `npm run dev`
- [ ] Test authentication
- [ ] Test chat rooms
- [ ] Test AI Language Buddy
- [ ] Test games

---

**Happy Language Learning! 🌍✨**

If you encounter issues, check the troubleshooting section above or open a GitHub issue.
