import dotenv from "dotenv";
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + ".firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_PROJECT_ID + ".appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING,
    appId: process.env.FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
export {firebase, storage};