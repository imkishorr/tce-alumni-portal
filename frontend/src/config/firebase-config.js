import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDSHdw4HgZHzD1ITkkZCz037N0NyREsOyM",
  authDomain: "tce-alumini-portal.firebaseapp.com",
  projectId: "tce-alumini-portal",
  storageBucket: "tce-alumini-portal.firebasestorage.app",
  messagingSenderId: "466950131004",
  appId: "1:466950131004:web:d9ed91dab7d2f2cd0b6239",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };