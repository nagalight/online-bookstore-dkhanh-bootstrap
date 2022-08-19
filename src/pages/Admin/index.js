import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button } from "react-bootstrap";
import "./admin.css";

import { db } from "../../firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";   

export default function AdminManagement() {
    const [userData, setUserData] = useState([]);
    
    useEffect(()=>{
        if (collection){
            const fetchUserData = () => {
                const q = query(collection(db, "users"), where("role", "==", 'User'))
                onSnapshot(q,(querySnapshot)=>{
                    const getUserDataFromFirestore = [];
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                        getUserDataFromFirestore.push({...doc.data(), key: doc.id})
                    });
                    setUserData(getUserDataFromFirestore);
                });
            }
            return fetchUserData;
        }
    }, [])
    const test = () => {
        console.log(userData)
    }
    
    return (
        <>
        <Container className="tabWrapper">
            <Container className="Title">Administrator Page</Container>
            <Tabs
                defaultActiveKey="admins"
                id="admin-manage-tab"
                className="mb-3"
                fill
            >
                <Tab eventKey="admins" title="Admins account">
                    <Button onClick={test}>Test</Button>
                </Tab>
                <Tab eventKey="users" title="Users account">
                    <Button variant="primary">Add Users</Button>
                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData.map(doc =>{
                                    return(
                                        <tr>
                                            <th>{doc.username}</th>
                                            <th>{doc.email}</th>
                                            <th>{doc.authProvider}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> 
                </Tab>
                <Tab eventKey="books" title="Books">
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                    </tbody>
                    </Table> 
                </Tab>
            </Tabs>
        </Container>
        </>
    )
}