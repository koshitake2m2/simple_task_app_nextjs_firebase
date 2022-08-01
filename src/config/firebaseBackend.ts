/**
 * reference: https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ja&authuser=0#using_a_service_account_id
 */
import { initializeApp, AppOptions } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const firebaseConfig: AppOptions = {
  serviceAccountId: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export type FirebaseBackendService = {
  auth: Auth;
  db: Firestore;
};

export const firebase: FirebaseBackendService = {
  auth: auth,
  db: db,
};
