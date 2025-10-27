// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW9YY2GvHclPZTGPIIaijzJBc4IQVM4ZY",
  authDomain: "lavision-7daae.firebaseapp.com",
  projectId: "lavision-7daae",
  storageBucket: "lavision-7daae.firebasestorage.app",
  messagingSenderId: "568824305305",
  appId: "1:568824305305:web:e54c5d5d89166784458a08",
  measurementId: "G-TY3GQNBNG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Safely initialize analytics only in browser
let analytics: ReturnType<typeof getAnalytics> | undefined;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (e) {
  // analytics may fail in non-browser envs; ignore
}

// Auth instance
export const auth = getAuth(app);

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Apple provider via generic OAuth (Firebase supports 'apple.com')
const appleProvider = new OAuthProvider('apple.com');
// Optionally request scopes: name & email are default; ensure you enabled in Apple dashboard
appleProvider.addScope('email');
appleProvider.addScope('name');

// Helper: Google popup sign-in
export async function signInWithGooglePopup() {
  const result = await signInWithPopup(auth, googleProvider);
  // Access token & user
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const accessToken = credential?.accessToken;
  return { user: result.user, accessToken };
}

// Helper: Google redirect sign-in (for environments blocking popups)
export async function signInWithGoogleRedirect() {
  await signInWithRedirect(auth, googleProvider);
}
export async function getGoogleRedirectResult() {
  const result = await getRedirectResult(auth);
  if (!result) return null;
  const credential = GoogleAuthProvider.credentialFromResult(result);
  return { user: result.user, accessToken: credential?.accessToken };
}

// Helper: Apple popup sign-in
export async function signInWithApplePopup() {
  const result = await signInWithPopup(auth, appleProvider);
  const credential = OAuthProvider.credentialFromResult(result);
  // Apple does not provide persistent access token in same way; ID token available
  const idToken = (credential as any)?.idToken;
  return { user: result.user, idToken };
}

// Helper: Apple redirect sign-in
export async function signInWithAppleRedirect() {
  await signInWithRedirect(auth, appleProvider);
}
export async function getAppleRedirectResult() {
  const result = await getRedirectResult(auth);
  if (!result) return null;
  const credential = OAuthProvider.credentialFromResult(result);
  const idToken = (credential as any)?.idToken;
  return { user: result.user, idToken };
}

export { analytics };