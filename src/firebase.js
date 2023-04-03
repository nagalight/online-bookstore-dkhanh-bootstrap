// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage, } from "firebase/storage";

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
const bookStorage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const adminAddUser = async (username, email, password) => {
  const res = await createUserWithEmailAndPassword(auth2, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    username,
    authProvider: "Local",
    email,
    password,
    role:"User",
    isAdmin:false
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
    role:"Admin",
    isAdmin:true
  });
};

const bookRef = collection(db,"books")

const addBookToDatabase = async (newBook) =>{
  await addDoc(bookRef, newBook);
}

const updateBookOnDatabase = async (id, updatedBook) =>{
  const bookDoc = doc(db, "books", id);
  await updateDoc(bookDoc, updatedBook);
}

const deleteBookOnDatabase = async (id) =>{
  const bookDoc = doc(db, "books", id);
  await deleteDoc(bookDoc);
}

const getAllBooksData = async () =>{
  await getDocs(bookRef);
}

const getBookData = async (id) =>{
  const bookDoc = doc(db, "books", id);
  await getDoc(bookDoc);
};


export {
  auth,
  db,
  googleProvider,
  dbRealTime,
  adminAddUser,
  adminAddAdmin,
  addBookToDatabase,
  updateBookOnDatabase,
  deleteBookOnDatabase,
  getAllBooksData,
  getBookData,
  bookStorage,
};