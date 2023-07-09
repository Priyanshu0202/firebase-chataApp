import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwemraRGGEEwbw2tsDO7IRg9RYTg8lqk8",
  authDomain: "fir-chat-app-c373d.firebaseapp.com",
  projectId: "fir-chat-app-c373d",
  storageBucket: "fir-chat-app-c373d.appspot.com",
  messagingSenderId: "362671257216",
  appId: "1:362671257216:web:5bc18f83d41cc604c29865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);