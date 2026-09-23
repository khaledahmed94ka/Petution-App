// =============================================================================
// PETUTION AUTHENTICATION SERVICE: Firebase Authentication
// Firebase is the only source of truth for who is signed in.
// =============================================================================

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

// A build without Firebase settings cannot sign anyone in; the app then offers only the local demo.
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let auth = null;
let db = null;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = initializeFirestore(app, { ignoreUndefinedProperties: true });

  if (env.VITE_USE_FIREBASE_EMULATORS === 'true') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }
}

export { auth, db };

export const toAppUser = (firebaseUser) => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Clinic Owner',
  email: firebaseUser.email || '',
  photoURL: firebaseUser.photoURL || null,
  role: 'Owner',
  provider: firebaseUser.providerData?.some(p => p.providerId === 'google.com') ? 'google' : 'email',
  isAuthenticated: true
});

export const watchAuth = (callback) => onAuthStateChanged(auth, callback);

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  return result.user;
};

export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signUpWithEmail = async (email, password, displayName) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    // Without this the name typed at sign-up is lost on the next page load.
    await updateProfile(result.user, { displayName });
  }
  return result.user;
};

export const sendPasswordReset = (email) => sendPasswordResetEmail(auth, email);

export const signOutUser = () => (auth ? signOut(auth) : Promise.resolve());

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/user-not-found': 'Wrong email or password.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/email-already-in-use': 'An account with this email already exists. Sign in instead.',
  'auth/weak-password': 'Choose a password with at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
  'auth/network-request-failed': 'No connection to the sign-in server. Check your internet connection.',
  'auth/popup-blocked': 'The browser blocked the Google sign-in window. Allow pop-ups for this site and try again.'
};

export const describeAuthError = (err) => AUTH_ERROR_MESSAGES[err?.code] || err?.message || 'Sign-in failed.';

// Closing the Google window is a choice, not an error worth reporting.
export const isAuthCancellation = (err) =>
  ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(err?.code);
