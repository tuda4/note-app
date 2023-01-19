// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmotiwngc0GBb2oL8f-E1lC5OrLpl5nRI",
  authDomain: "note-app-47c3d.firebaseapp.com",
  projectId: "note-app-47c3d",
  storageBucket: "note-app-47c3d.appspot.com",
  messagingSenderId: "51779638256",
  appId: "1:51779638256:web:a16e96e115edf93aae8335",
  measurementId: "G-S71GDEZHN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);