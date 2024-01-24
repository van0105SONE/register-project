import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCqpqTS5t2fe2Lp6Pb4QheN7gw_ebQYEQA",
  authDomain: "student-regisgte.firebaseapp.com",
  projectId: "student-regisgte",
  storageBucket: "student-regisgte.appspot.com",
  messagingSenderId: "835347123501",
  appId: "1:835347123501:web:617aba1315cdcb1ac197a4",
  measurementId: "G-3TG283GBE8"
};
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)




