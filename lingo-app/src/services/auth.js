import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://demo.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export async function signUpWithEmail(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with username
    await updateProfile(userCredential.user, {
      displayName: username
    });
    
    return {
      success: true,
      user: {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        username: username,
        status: 'online',
        joinedAt: Date.now()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Sign in with email and password
export async function signInWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    return {
      success: true,
      user: {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        username: userCredential.user.displayName || email.split('@')[0],
        status: 'online',
        joinedAt: Date.now()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    return {
      success: true,
      user: {
        userId: result.user.uid,
        email: result.user.email,
        username: result.user.displayName || result.user.email.split('@')[0],
        status: 'online',
        joinedAt: Date.now()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Sign out
export async function signOutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Listen to auth state changes
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user = {
        userId: firebaseUser.uid,
        email: firebaseUser.email,
        username: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        status: 'online',
        joinedAt: Date.now()
      };
      callback(user);
    } else {
      callback(null);
    }
  });
}

export { auth };
