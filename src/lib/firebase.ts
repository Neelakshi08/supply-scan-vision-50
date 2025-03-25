
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALziof-CN-337pLNbYb1imfo-mp7pffuk",
  authDomain: "codein-d22f5.firebaseapp.com",
  projectId: "codein-d22f5",
  storageBucket: "codein-d22f5.firebasestorage.app",
  messagingSenderId: "293325347582",
  appId: "1:293325347582:web:1a323436717e210d7663af",
  measurementId: "G-B6PE817SBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
