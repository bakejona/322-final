// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOELrGRdI1myifJ-cSMfv-33drHoxLRZQ",
  authDomain: "fir-67f10.firebaseapp.com",
  projectId: "fir-67f10",
  storageBucket: "fir-67f10.firebasestorage.app",
  messagingSenderId: "149856391167",
  appId: "1:149856391167:web:690e1cd285610e716961ca",
  measurementId: "G-FFKC92XVK4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
// Initialize Firebase
if (Platform.OS === "web") {
  // For web, use a different persistence method
  auth = initializeAuth(app);
} else {
  // For mobile, use React Native AsyncStorage
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth, db };
