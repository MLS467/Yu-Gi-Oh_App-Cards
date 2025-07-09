import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
