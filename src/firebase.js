import { getDatabase } from "firebase/database"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);

export const database = getDatabase(app);