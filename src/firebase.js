
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD2nUh3A_35jXHzuuPrYwn9ENzHvwHV3ds",
    authDomain: "nekretnine-f5c1d.firebaseapp.com",
    projectId: "nekretnine-f5c1d",
    storageBucket: "nekretnine-f5c1d.appspot.com",
    messagingSenderId: "914772017140",
    appId: "1:914772017140:web:7e5d7bb116d2f8766543a1"
  };

initializeApp(firebaseConfig);

export const db = getFirestore();
