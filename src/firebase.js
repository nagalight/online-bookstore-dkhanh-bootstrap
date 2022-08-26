// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence, 
  browserSessionPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";

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
const auth = getAuth(app);
const db = getFirestore(app);
const dbRealTime= getDatabase(app);
const app2 = initializeApp(firebaseConfig, "Secondary");
const auth2 = getAuth(app2);

const registerWithEmailAndPassword = async (username, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "Local",
    email,
    password,
    role:"User"
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

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: user.displayName,
      authProvider: "Google",
      email: user.email,
      role:"User",
    });
  }
}

const adminAddUser = async (username, email, password) => {
  const res = await createUserWithEmailAndPassword(auth2, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "Local",
    email,
    password,
    role:"User"
  });
};
const adminAddAdmin = async (username, email, password) => {
  const res = await createUserWithEmailAndPassword(auth2, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "Local",
    email,
    password,
    role:"Admin"
  });
};



export {
  auth,
  db,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
  signInWithGoogle,
  dbRealTime,
  adminAddUser,
  adminAddAdmin,
};