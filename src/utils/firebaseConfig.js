// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Read Firebase config from Vite environment variables.
// Vite exposes variables prefixed with VITE_ via import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Warn in development if any required env var is missing to make debugging easier.
const missingKeys = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (import.meta.env.DEV && missingKeys.length) {
  console.warn(
    "Missing Firebase environment variables:",
    missingKeys.join(", "),
    "\nMake sure to add them to .env.local (see .env.example)."
  );
}

// If required keys are missing, avoid initializing Firebase to prevent runtime exceptions
const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

let isConfigured = requiredKeys.every((k) => !!firebaseConfig[k]);

let app = null;
let auth = null;

if (isConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (err) {
    // If initialization fails (for example invalid API key), don't throw — keep app/auth null
    // and mark Firebase as not configured so the rest of the app can show a friendly message.
    console.error("Firebase initialization error:", err);
    isConfigured = false;
  }
} else if (import.meta.env.DEV) {
  console.warn(
    "Firebase not initialized because some VITE_FIREBASE_* env vars are missing. See .env.example."
  );
}

function isFirebaseConfigured() {
  return isConfigured && app && auth;
}

export { app, auth, isFirebaseConfigured };