# Netlify Deployment Guide

## Prerequisites

- GitHub/GitLab/Bitbucket account
- Netlify account (free tier works)
- Firebase project set up
- Google Gemini API key

## Step 1: Prepare Your Repository

1. Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

### Option A: Via Netlify Dashboard (Recommended)

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click "Deploy site"

### Option B: Via Netlify CLI

```bash
cd lingo-app
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Step 3: Configure Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable** and add each of these:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**Where to find Firebase values:**
- Go to Firebase Console → Project Settings → General
- Scroll to "Your apps" section
- Copy values from the Firebase config object

**Where to find Gemini API key:**
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create or copy your API key

3. Click **Save** after adding all variables
4. **Trigger a new deploy** (Site overview → Deploys → Trigger deploy → Deploy site)

## Step 4: Configure Firebase

### Add Netlify Domain to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add your Netlify domain: `your-app-name.netlify.app`
6. If you have a custom domain, add that too

### Verify Database Rules

1. Go to **Realtime Database** → **Rules**
2. Ensure your rules allow authenticated users:

```json
{
  "rules": {
    "rooms": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "privateChats": {
      "$chatId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

3. Click **Publish**

## Step 5: Verify Deployment

After deployment completes:

1. **Test Authentication:**
   - Try Google Sign-in
   - Try Email/Password sign-up and login

2. **Test Chat Features:**
   - Join a chat room
   - Send messages
   - Check real-time updates

3. **Test AI Language Buddy:**
   - Open AI Buddy window
   - Select a language
   - Send a message
   - Verify AI responds

4. **Test Voice Features:**
   - Try voice input (requires HTTPS ✓)
   - Test pronunciation mode

5. **Test Games:**
   - Halloween Hangman
   - Word Scramble

## Step 6: Custom Domain (Optional)

1. In Netlify Dashboard: **Domain settings** → **Add custom domain**
2. Follow DNS configuration instructions
3. Add custom domain to Firebase authorized domains

## Troubleshooting

### Build Fails

**Error:** `npm run build` fails
- Check `package.json` has all dependencies
- Verify Node version compatibility
- Check build logs in Netlify dashboard

### Authentication Not Working

**Error:** Firebase auth fails
- Verify Netlify domain is in Firebase authorized domains
- Check environment variables are set correctly
- Ensure variables start with `VITE_` prefix

### Environment Variables Not Loading

**Error:** `import.meta.env.VITE_*` is undefined
- Verify all variables start with `VITE_` prefix
- Redeploy after adding variables
- Check variables in Netlify dashboard

### 404 on Page Refresh

**Error:** Page not found when refreshing
- Verify `netlify.toml` has redirect rules
- Check `publish` directory is set to `dist`

### Real-time Chat Not Working

**Error:** Messages don't appear
- Check Firebase Database URL is correct
- Verify database rules allow authenticated users
- Check browser console for errors

### AI Buddy Not Responding

**Error:** AI doesn't respond
- Verify `VITE_GEMINI_API_KEY` is set
- Check API key is valid
- Check browser console for API errors

## Monitoring

### Check Deployment Status

```bash
netlify status
```

### View Logs

```bash
netlify logs
```

### View Build Logs

In Netlify Dashboard: **Deploys** → Click on a deploy → View logs

## Continuous Deployment

Once connected to Git, Netlify automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Netlify automatically deploys!
```

## Performance Optimization

The build shows a large bundle (655 KB). Consider these optimizations:

1. **Code Splitting:**
```javascript
// Use dynamic imports for large components
const AIBuddyWindow = lazy(() => import('./components/Windows/AIBuddyWindow'));
```

2. **Chunk Splitting:**
Add to `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
        'ai': ['@google/generative-ai']
      }
    }
  }
}
```

## Security Best Practices

1. **Never commit `.env` file** (already in `.gitignore`)
2. **Use Firebase Security Rules** to protect data
3. **Rotate API keys** if exposed
4. **Enable Firebase App Check** for production
5. **Set up rate limiting** for Gemini API

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Your app is now live! 🚀**

Share your Netlify URL: `https://your-app-name.netlify.app`
