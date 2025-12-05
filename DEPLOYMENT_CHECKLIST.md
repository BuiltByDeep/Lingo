# Netlify Deployment Checklist

## Pre-Deployment ✅

- [x] `netlify.toml` created
- [x] Build tested locally (`npm run build` successful)
- [x] `.env.example` is up to date
- [x] `.env` is in `.gitignore`
- [ ] Code pushed to GitHub/GitLab/Bitbucket

## Netlify Setup 🚀

- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] Build settings configured (auto-detected from `netlify.toml`)
- [ ] Initial deployment triggered

## Environment Variables 🔑

Add these in Netlify Dashboard (Site settings → Environment variables):

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_DATABASE_URL`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_GEMINI_API_KEY`
- [ ] Triggered new deploy after adding variables

## Firebase Configuration 🔥

- [ ] Netlify domain added to Firebase authorized domains
- [ ] Custom domain added (if applicable)
- [ ] Database rules verified and published
- [ ] Authentication methods enabled (Google, Email/Password)

## Testing 🧪

- [ ] Authentication works (Google Sign-in)
- [ ] Authentication works (Email/Password)
- [ ] Chat rooms load and display messages
- [ ] Real-time messaging works
- [ ] Private chat works
- [ ] AI Language Buddy responds
- [ ] Voice input works (microphone)
- [ ] Halloween Hangman game works
- [ ] Word Scramble game works
- [ ] All themes work correctly
- [ ] Mobile responsive design works

## Post-Deployment 📝

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Netlify)
- [ ] Performance tested (Lighthouse score)
- [ ] Error monitoring set up (optional)
- [ ] Analytics configured (optional)

## Quick Commands

```bash
# Test build locally
cd lingo-app && npm run build

# Preview production build
npm run preview

# Deploy via CLI (alternative)
netlify deploy --prod

# Check deployment status
netlify status

# View logs
netlify logs
```

## Your Deployment URLs

- **Netlify URL:** `https://your-app-name.netlify.app`
- **Custom Domain:** (if configured)

## Next Steps

1. Share your app URL with users
2. Monitor Firebase usage (Authentication, Database)
3. Monitor Gemini API usage
4. Set up error tracking (Sentry, LogRocket)
5. Configure analytics (Google Analytics, Plausible)
6. Set up uptime monitoring

---

**Need help?** Check `lingo-app/NETLIFY_DEPLOYMENT.md` for detailed instructions.
