import React, { useContext, useState, useEffect } from 'react'
import { auth, db, googleProvider } from '../firebase'
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    setPersistence, 
    browserSessionPersistence,
    GoogleAuthProvider,
} from "firebase/auth";
import {
    query,
    getDoc,
    getDocs,
    collection,
    where,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const[currentUser, setCurrentUser] = useState()
    const[loading, setLoading] = useState(true)

    const signUp = async (username, email, password) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
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

    const logIn = async (email, username, password) => {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return signInWithEmailAndPassword(auth, email, username, password);
        })
    };

    const loginWithGoogle = async () => {
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
                isAdmin:false
            });
        }
    }
    
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
        setLoading(false)
      })

      return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        signUp,
        logIn,
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
