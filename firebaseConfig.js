// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage}from "firebase/storage"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkO6ESBKqg3vgvl5tNhxDouIWNeb8a-U4",
  authDomain: "trippy-2ba7d.firebaseapp.com",
  databaseURL: "https://trippy-2ba7d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trippy-2ba7d",
  storageBucket: "trippy-2ba7d.firebasestorage.app",
  messagingSenderId: "404107584544",
  appId: "1:404107584544:web:75f456a2fbbd25dd8ec845",
  measurementId: "G-CS66EXFLF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);
export const database= getFirestore(app);
export const storage= getStorage(app);
