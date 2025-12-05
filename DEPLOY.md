# 🚀 Deployment Guide

## Structure (Flattened - No More Confusion!)

Your project now has a clean, flat structure:

```
Lingoapp/
├── src/                    # React source code
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── netlify.toml            # Netlify configuration
├── index.html              # Entry HTML
└── README.md               # Documentation
```

**No more nested `lingo-app/` folder!** Everything is at the root level.

---

## Deploy to Netlify

### Option 1: Via Netlify Dashboard (Recommended)

1. **Go to [app.netlify.com](https://app.netlify.com)**
2. **Click "Add new site" → "Import an existing project"**
3. **Connect to GitHub** and select your repository
4. **Configure build settings:**
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Add environment variables** (Site settings → Environment variables):
   ```
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_DATABASE_URL
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   VITE_GEMINI_API_KEY
   ```
6. **Click "Deploy site"**

### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## Post-Deployment Checklist

After deployment:

- [ ] Add your Netlify domain to Firebase authorized domains
- [ ] Restrict Gemini API key to your Netlify domain in Google Cloud Console
- [ ] Test authentication (sign in/sign up)
- [ ] Test chat functionality
- [ ] Test AI Buddy with different languages
- [ ] Test games (Hangman, Word Scramble)
- [ ] Check browser console for errors

---

## Netlify Configuration Explained

The `netlify.toml` file handles:

1. **Build settings**: Runs `npm run build` and publishes from `dist/`
2. **SPA routing**: Redirects all routes to `index.html` (fixes 404 errors)
3. **Node version**: Uses Node 18 for builds

The `public/_redirects` file is also copied to `dist/` during build as a backup.

---

## Common Issues

### "Page not found" error
- **Cause**: SPA routing not configured
- **Fix**: Already handled by `netlify.toml` and `_redirects` file

### Build fails
- **Cause**: Missing environment variables
- **Fix**: Add all `VITE_*` variables in Netlify dashboard

### Firebase auth doesn't work
- **Cause**: Domain not authorized
- **Fix**: Add your Netlify domain to Firebase Console → Authentication → Authorized domains

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env` with your Firebase and Gemini API keys.

**Important**: Never commit `.env` to Git! It's already in `.gitignore`.
