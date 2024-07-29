// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "workflow-helper-24.firebaseapp.com",
  projectId: "workflow-helper-24",
  storageBucket: "workflow-helper-24.appspot.com",
  messagingSenderId: "178091259363",
  appId: "1:178091259363:web:18fd4b2d8aace8d5685cd6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
