import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqJIrrT59JuszJ5aCNZZIOlyM0NlH098k",
  authDomain: "maee-22eec.firebaseapp.com",
  projectId: "maee-22eec",
  storageBucket: "maee-22eec.appspot.com",
  messagingSenderId: "161801158313",
  appId: "1:161801158313:web:955f8971d96e131576b3b8",
  measurementId: "G-CVR1HW9F0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
