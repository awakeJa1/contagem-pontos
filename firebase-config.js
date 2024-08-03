// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

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

export { app, analytics };
