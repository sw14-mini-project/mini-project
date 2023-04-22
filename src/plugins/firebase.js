import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkNg_bubTx2u952hqgzreOuuVRKcGs6p4",
    authDomain: "sw14-miniproject.firebaseapp.com",
    projectId: "sw14-miniproject",
    storageBucket: "sw14-miniproject.appspot.com",
    messagingSenderId: "522328263462",
    appId: "1:522328263462:web:7ed342684260f67cf68fe7",
    measurementId: "G-23XTXDXQ39"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);