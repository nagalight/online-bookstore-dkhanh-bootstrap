import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Button } from "react-bootstrap";
import "./admin.css";

import AdminTable from "../../components/Admin/Tables/Admins";
import UserTable from "../../components/Admin/Tables/Users";
import BookTable from "../../components/Admin/Tables/Books";

import AddUserForm from "../../components/Admin/Form/AddUserForm";
import AddAdminForm from "../../components/Admin/Form/AddAdminForm";
import AddBookForm from "../../components/Admin/Form/AddBookForm";

import { db } from "../../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import { useAuth } from "../../contexts/authContext"
import { Navigate } from "react-router-dom"
import OrderTable from "../../components/Admin/Tables/Orders";

export default function AdminManagement() {
    const { currentUser } = useAuth()
    const [role, setRole] = useState(true);

    const fetchUserRole = async () =>{
        const q = query(collection(db, "users"), where("uid", "==", currentUser?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setRole(data.isAdmin);
    }
    useEffect(() => {
        if (currentUser){
            fetchUserRole()
        }
    }, [role])
    
    const [showAddForm, setShowAddForm] = useState(false);
    const handleShowAddForm = () => setShowAddForm(true);

    const [showAddAdminForm, setShowAddAdminForm] = useState(false);
    const handleShowAddAdminForm = () => setShowAddAdminForm(true);

    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const handleShowAddBookForm = () => setShowAddBookForm(true);

    if (currentUser){
        if (role === true){
            return (
                <>
                <Container className="tabWrapper">
                    <Container className="titleWrapper">
                        <Container className="titleText">Administrator Page</Container>
                    </Container>
                    <Tabs
                        defaultActiveKey="admins"
                        id="admin-manage-tab"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="admins" title="Admins account">
                            <Container className="tabContainer">
                                <Button onClick={handleShowAddAdminForm}>Add Admin account</Button>
                                <AdminTable/>
                            </Container> 
                        </Tab>
        
                        <Tab eventKey="users" title="Users account">
                            <Container className="tabContainer">
                                <Button variant="primary" onClick={handleShowAddForm}>Add Users</Button>
                                <UserTable/>
                            </Container>
                        </Tab>
                        
                        <Tab eventKey="books" title="Books">
                            <Container className="tabContainer">
                                <Button onClick={handleShowAddBookForm}>Add Book</Button>
                                <BookTable/>
                            </Container>
                        </Tab>

                        <Tab eventKey="orders" title="Orders">
                            <Container className="tabContainer">
                                <OrderTable/>
                            </Container>
                        </Tab>
                    </Tabs>
                </Container>
                <AddAdminForm show={showAddAdminForm} onHide={() => setShowAddAdminForm(false)}/>
                <AddUserForm show={showAddForm} onHide={() => setShowAddForm(false)}/>
                <AddBookForm show={showAddBookForm} onHide={() => setShowAddBookForm(false)}/>
                </>
            )
        }else if (role === false){
            return <Navigate to="/404"/>
        }
    }else if (!currentUser){
        return <Navigate to="/404"/>
    }
}



