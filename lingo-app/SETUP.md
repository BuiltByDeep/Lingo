# Lingo App - Complete Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Firebase account (free tier works)
- An OpenAI API account (optional - app works with mock responses)

## Step 1: Install Dependencies

```bash
cd lingo-app
npm install
```

## Step 2: Firebase Setup

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Name it "lingo-app" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Realtime Database

1. In your Firebase project, go to "Build" → "Realtime Database"
2. Click "Create Database"
3. Choose a location (closest to your users)
4. Start in **Test mode** (we'll secure it later)
5. Click "Enable"

### Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### Update Environment Variables

1. Open `.env` file in the project root
2. Replace the demo values with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Set Security Rules (Important!)

1. In Realtime Database, go to "Rules" tab
2. Replace with these rules:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".read": true,
          ".write": true,
          ".indexOn": ["timestamp"]
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

3. Click "Publish"

**Note:** These are permissive rules for development. For production, add proper authentication.

## Step 3: OpenAI Setup (Optional)

### Get API Key

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the key (you won't see it again!)

### Add to Environment

Update `.env`:

```env
VITE_OPENAI_API_KEY=sk-your-actual-openai-key
```

**Note:** If you skip this step, the app will use mock AI responses (still functional for demo).

## Step 4: Run the App

```bash
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`)

## Step 5: Test the Features

### Test Chat Room

1. Enter a username
2. Click "Start" → "Spanish Chat Room"
3. Open another browser window (incognito mode)
4. Enter a different username
5. Send messages between the two windows
6. You should see real-time updates!

### Test AI Buddy

1. Click "Start" → "AI Language Buddy"
2. Try these commands:
   - "Como estas" (test grammar correction)
   - "Translate: Hello, how are you?"
   - "How do I pronounce hola?"
   - "Give me practice ideas"
3. Click the microphone icon to test voice input (Chrome/Edge only)

## Troubleshooting

### Firebase Not Connecting

- Check your `.env` file has correct values
- Make sure `VITE_FIREBASE_DATABASE_URL` includes `https://`
- Verify Realtime Database is enabled in Firebase Console
- Check browser console for errors

### Voice Input Not Working

- Voice input only works in Chrome and Edge browsers
- Make sure you allow microphone permissions
- HTTPS is required for production (localhost works for dev)

### AI Responses Not Working

- If using OpenAI: verify your API key is correct
- Check you have credits in your OpenAI account
- If no API key: app will use mock responses (this is normal)

### Messages Not Syncing

- Open browser console and check for Firebase errors
- Verify both users are in the same room
- Check Firebase security rules are published
- Try refreshing the page

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables in Vercel

Add all your `.env` variables in:
Settings → Environment Variables

Make sure to add them for all environments (Production, Preview, Development)

### Security Checklist

- [ ] Update Firebase security rules for production
- [ ] Add authentication (Firebase Auth)
- [ ] Rate limit API calls
- [ ] Use environment variables for all secrets
- [ ] Enable CORS properly
- [ ] Add input validation
- [ ] Sanitize user messages

## Next Steps

- Add more language rooms (French, Japanese, etc.)
- Implement private messaging
- Add user profiles and avatars
- Create achievement system
- Add voice rooms for live practice
- Implement spaced repetition flashcards

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Make sure Firebase and OpenAI services are active
4. Check the GitHub issues page

Happy language learning! 🌍
