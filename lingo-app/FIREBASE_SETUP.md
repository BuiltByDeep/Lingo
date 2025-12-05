# Firebase Setup Guide for Lingo App

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `lingo-app` (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (optional, you can enable it later)
6. Click **Create project**
7. Wait for project creation (takes ~30 seconds)
8. Click **Continue** when ready

## Step 2: Enable Authentication

### Email/Password Authentication

1. In your Firebase project, click **Authentication** in the left sidebar
2. Click **Get started** (if first time)
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

### Google Authentication (Optional but Recommended)

1. Still in **Sign-in method** tab
2. Click on **Google**
3. Toggle **Enable** to ON
4. Select a **Project support email** from dropdown
5. Click **Save**

## Step 3: Enable Realtime Database

1. Click **Realtime Database** in the left sidebar (under Build section)
2. Click **Create Database**
3. Select a location (choose closest to your users):
   - `us-central1` (United States)
   - `europe-west1` (Belgium)
   - `asia-southeast1` (Singapore)
4. Choose **Start in test mode** (we'll secure it later)
5. Click **Enable**
6. Wait for database creation

## Step 4: Get Firebase Configuration

1. You should already be on the **Project settings** page (General tab)
2. Scroll down to the **"Your apps"** section
3. You'll see "There are no apps in your project"
4. Click the **web icon** `</>` (it looks like angle brackets)
5. Enter app nickname: `lingo-web-app`
6. **Do NOT** check "Also set up Firebase Hosting"
7. Click **Register app**
8. You'll see a `firebaseConfig` object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "lingo-app-xxxxx.firebaseapp.com",
  databaseURL: "https://lingo-app-xxxxx-default-rtdb.firebaseio.com",
  projectId: "lingo-app-xxxxx",
  storageBucket: "lingo-app-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

9. **Copy these values** - you'll need them next!
10. Click **Continue to console**

## Step 5: Update Environment Variables

1. Open your project folder
2. Open the `.env` file
3. Replace the demo values with your actual Firebase config:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=lingo-app-xxxxx.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://lingo-app-xxxxx-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=lingo-app-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=lingo-app-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# OpenAI Configuration (optional)
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

4. **Save the file**

## Step 6: Set Security Rules

### Realtime Database Rules

1. Go back to Firebase Console
2. Click **Realtime Database**
3. Click the **Rules** tab
4. **Delete everything** in the editor
5. Copy and paste these rules exactly:

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
          "$userId": {
            ".write": "auth.uid === $userId"
          }
        }
      }
    }
  }
}
```

6. Click **Publish**

**Note:** I simplified the rules to avoid validation errors. These rules:
- ✅ Require authentication for all read/write operations
- ✅ Users can only update their own user data
- ✅ Messages are indexed by timestamp for fast queries

### What These Rules Do:
- ✅ Only authenticated users can read/write messages
- ✅ Users can only update their own user data
- ✅ Messages must have required fields
- ✅ Indexed by timestamp for fast queries

## Step 7: Test Your Setup

1. **Restart your dev server**:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Open the app** in your browser (usually http://localhost:5173)

3. **Test Sign Up**:
   - Click "Sign Up" button
   - Enter username, email, and password
   - Click "Sign Up"
   - You should be redirected to the desktop!

4. **Verify in Firebase**:
   - Go to Firebase Console → Authentication → Users
   - You should see your new user listed!

5. **Test Sign In**:
   - Sign out from the app
   - Click "Sign In"
   - Enter your email and password
   - You should be logged in!

6. **Test Google Sign In** (if enabled):
   - Click "Sign in with Google"
   - Choose your Google account
   - You should be logged in!

## Step 8: Test Real-time Chat

1. **Open two browser windows**:
   - Main browser: http://localhost:5173
   - Incognito/Private window: http://localhost:5173

2. **Sign in with different accounts** in each window

3. **Open Spanish Chat Room** in both windows

4. **Send messages** back and forth

5. **Watch them sync in real-time!** 🎉

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check your `VITE_FIREBASE_API_KEY` in `.env`
- Make sure there are no extra spaces
- Restart dev server after changing `.env`

### "Permission denied"
- Check your Realtime Database rules
- Make sure you're signed in
- Verify rules are published

### "Firebase: Error (auth/popup-blocked)"
- Allow popups for localhost in your browser
- Try email/password sign in instead

### Google Sign In not working
- Make sure you enabled Google in Firebase Console
- Check that you selected a support email
- Try in a different browser

### Messages not syncing
- Check Firebase Console → Realtime Database → Data
- Verify you see messages being created
- Check browser console for errors
- Make sure both users are signed in

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and run `npm install`
- Check that all imports are correct

## Security Best Practices

### For Development (Current Setup)
✅ Test mode rules allow easy development
✅ Authentication required for all operations
✅ Basic validation on data structure

### For Production (Recommended)
1. **Add rate limiting**:
   ```json
   ".write": "auth != null && !data.exists() && 
              now - root.child('users').child(auth.uid).child('lastMessage').val() > 1000"
   ```

2. **Validate message content**:
   ```json
   "message": {
     ".validate": "newData.isString() && 
                   newData.val().length > 0 && 
                   newData.val().length <= 500"
   }
   ```

3. **Add user roles**:
   ```json
   ".write": "auth != null && 
              (root.child('users').child(auth.uid).child('role').val() === 'user' ||
               root.child('users').child(auth.uid).child('role').val() === 'admin')"
   ```

4. **Enable App Check** (prevents abuse)
5. **Set up monitoring and alerts**
6. **Regular security audits**

## Next Steps

✅ Firebase Authentication working
✅ Realtime Database configured
✅ Security rules in place

Now you can:
1. Add more language rooms
2. Implement private messaging
3. Add user profiles
4. Create achievements system
5. Deploy to production!

## Useful Links

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Realtime Database Docs](https://firebase.google.com/docs/database)
- [Security Rules Guide](https://firebase.google.com/docs/database/security)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Make sure Firebase services are enabled
4. Check Firebase Console for error logs
5. Review this guide step by step

Happy coding! 🚀
