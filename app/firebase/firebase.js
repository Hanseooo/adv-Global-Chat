// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoDo_YdUpzY1Eixp07XbZ3PDo5WAo6GcU",
  authDomain: "world-chat-v2.firebaseapp.com",
  projectId: "world-chat-v2",
  storageBucket: "world-chat-v2.firebasestorage.app",
  messagingSenderId: "320425429748",
  appId: "1:320425429748:web:7b8b6d9faac23c4ec1aca1",
  measurementId: "G-HRB9WHBS9Q"
};

// Initialize Firebase (Avoid duplicate instances)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage), 
// });
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db };