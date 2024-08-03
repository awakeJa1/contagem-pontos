// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);