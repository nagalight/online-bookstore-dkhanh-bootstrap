import React, {useState, useEffect} from "react"
import { Route, Navigate, Routes } from "react-router-dom"
import { useAuth } from "../contexts/authContext"
import { auth, db, googleProvider } from '../firebase'
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

export default function AdminRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    const [role, setRole] = useState(false);

    const fetchUserRole = async () =>{
        const q = query(collection(db, "users"), where("uid", "==", currentUser?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(data.isAdmin)
        setRole(data.isAdmin);
    }
    useEffect(() => {
        fetchUserRole()
    }, [currentUser, role])
    


    return (
        <Routes>
            <Route
            {...rest}
            render={props => {
                return role ? <Component {...props} /> : <Navigate to="../pages/NotFoundPage"/>
            }}
            ></Route>
        </Routes>
        
    )
}