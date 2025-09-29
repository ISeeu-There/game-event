import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBveV8ztDxGsp6t36i0FzFQ4Pwf80kpgTA",
  authDomain: "event-site-e587e.firebaseapp.com",
  projectId: "event-site-e587e",
  storageBucket: "event-site-e587e.appspot.app",
  messagingSenderId: "79502271491",
  appId: "1:79502271491:web:c2c44ce8ec1094367bda36",
  measurementId: "G-YC49YKVRPN",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
