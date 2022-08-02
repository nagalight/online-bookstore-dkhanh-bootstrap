// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence, 
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {useState} from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClZajZKue4wORclKuI5i2FQLkp2Co_zkc",
  authDomain: "za-library-account.firebaseapp.com",
  databaseURL: "https://za-library-account-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "za-library-account",
  storageBucket: "za-library-account.appspot.com",
  messagingSenderId: "843494578243",
  appId: "1:843494578243:web:7229249aff57dc6e0cdcf6",
  measurementId: "G-MVT1TL4ENP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const registerWithEmailAndPassword = async (username, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "local",
    email,
    password,
  });
};

const logInWithEmailAndPassword = async (email, username, password) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, username, password);
    })
};

const logout = () => {
  signOut(auth);
};



export {
  auth,
  db,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
};