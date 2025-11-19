
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import React from 'react';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Verificação para garantir que as chaves não estão vazias, o que causa o erro.
if (!firebaseConfig.apiKey) {
    throw new Error("A chave de API do Firebase (NEXT_PUBLIC_FIREBASE_API_KEY) não foi definida. Verifique seu arquivo .env ou as variáveis de ambiente do seu servidor.");
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, 'us-central1'); // Use 'us-central1' if that's your region


export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <FirebaseErrorListener />
    </>
  );
};


export { app, auth, db, storage, functions };
