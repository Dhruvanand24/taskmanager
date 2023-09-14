
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC20vEU3C10BRupLNBQFVcvw7uHgQI0YM8",
  authDomain: "taskmanager-4f0c6.firebaseapp.com",
  projectId: "taskmanager-4f0c6",
  storageBucket: "taskmanager-4f0c6.appspot.com",
  messagingSenderId: "289330253524",
  appId: "1:289330253524:web:7380b348033e91b9c6f541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export {app,auth,db};