import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button } from "react-bootstrap";
import "./admin.css";

import { db } from "../../firebase";
// import { async } from "@firebase/util";
import { collection, getDocs, query } from "firebase/firestore";   
import 'firebase/firestore'

export default function AdminManagement() {
    const [userData, setUserData] = useState([]);
    const getUserDataFromFirestore = [];
    
    useEffect(()=>{
        const fetchUserData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                console.log(doc.data());
                getUserDataFromFirestore.push({...doc.data(), key: doc.id})
            });
            setUserData(getUserDataFromFirestore);
            console.log([userData])
        }   
        window.addEventListener('load', () => {
            fetchUserData();
        });
        fetchUserData();
        
    }, [])
    const test = () => {
        console.log(userData)
    }
    
    const test2 = () => {
        console.log(getUserDataFromFirestore)
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
                    <Button onClick={test2}>Test2</Button>
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
                                userData && userData.map(doc =>{
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