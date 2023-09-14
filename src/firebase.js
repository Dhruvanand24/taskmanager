
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNq7h1d4n_bryla4fd0dMyQHU-kS-4Mf4",
  authDomain: "taskmanager-7ba77.firebaseapp.com",
  projectId: "taskmanager-7ba77",
  storageBucket: "taskmanager-7ba77.appspot.com",
  messagingSenderId: "1013918679003",
  appId: "1:1013918679003:web:3e0d061e21aae57e16f1fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export {app,auth,db};