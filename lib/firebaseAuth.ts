import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth } from './firebase';

// Note: Google Sign-In is disabled for Expo Go
// It requires native modules and will only work in development builds or production apps

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
}

// Email/Password Authentication
export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<AuthUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile with display name
    await updateProfile(userCredential.user, { displayName });

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName,
      photoURL: userCredential.user.photoURL,
      phoneNumber: userCredential.user.phoneNumber,
    };
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      phoneNumber: userCredential.user.phoneNumber,
    };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

// Google Sign-In
export async function signInWithGoogle(): Promise<AuthUser> {
  // Google Sign-In requires a standalone build (EAS Build or expo build)
  // It doesn't work in Expo Go due to native module requirements
  throw new Error('Google Sign-In is only available in production builds. Please use email/password sign-in for now.');
}

// Phone Authentication
export async function sendPhoneVerificationCode(phoneNumber: string): Promise<string> {
  // Phone authentication requires native modules and reCAPTCHA
  // It doesn't work in Expo Go - only in production builds
  throw new Error('Phone authentication requires a production build and is not available in Expo Go. Please use email/password sign-in.');
}

export async function verifyPhoneCode(verificationId: string, code: string): Promise<AuthUser> {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      phoneNumber: userCredential.user.phoneNumber,
    };
  } catch (error: any) {
    console.error('Phone verification error:', error);
    throw new Error('Invalid verification code. Please try again.');
  }
}

// Password Reset
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

// Sign Out
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

// Helper function to get user-friendly error messages
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'Authentication failed. Please try again.';
  }
}
