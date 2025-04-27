import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8rBqXeLqNOu_IZfK6wqL5h-qt9L24Lfo",
    authDomain: "moneytracker-166ed.firebaseapp.com",
    projectId: "moneytracker-166ed",
    storageBucket: "moneytracker-166ed.firebasestorage.app",
    messagingSenderId: "345890186931",
    appId: "1:345890186931:web:163a0bafa45f2a8453f2c6",
    measurementId: "G-KLNJ5L7WE3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);