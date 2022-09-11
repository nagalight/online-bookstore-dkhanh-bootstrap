import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button, Form, Modal } from "react-bootstrap";
import "./admin.css";

import { db, adminAddUser, adminAddAdmin } from "../../firebase";
import { collection, onSnapshot, where, query, doc, deleteDoc } from "firebase/firestore";   

export default function AdminManagement() {
    const [userData, setUserData] = useState([]);
    const [adminData, setAdminData] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const handleShowAddForm = () => setShowAddForm(true);
    const handleHideAddForm = () => {
        setShowAddForm(false);
    }

    const [showAddAdminForm, setShowAddAdminForm] = useState(false);
    const handleShowAddAdminForm = () => setShowAddAdminForm(true);
    const handleHideAddAdminForm = () => {
        setShowAddAdminForm(false);
    }

    const fetchUserData = () => {
        const q = query(collection(db, "users"), where("role", "==", 'User'))
        onSnapshot(q,(querySnapshot)=>{
            setUserData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }

    const fetchAdminData = () => {
        const q = query(collection(db, "users"), where("role", "==", 'Admin'))
        onSnapshot(q,(querySnapshot)=>{
            setAdminData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }
    
    useEffect(()=>{
        if (collection){
            fetchUserData();
            fetchAdminData();
        }
    }, [])

    const deleteAccountData = (id) =>{
        deleteDoc(doc(db, "users", id ))
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
                    <Container className="tabTitle">Admin accounts management</Container>
                    <Button onClick={handleShowAddAdminForm}>Add Admin account</Button>
                    <AddAdminForm show={showAddAdminForm} onHide={() => setShowAddAdminForm(false)}/>
                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Provider</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                adminData?.map(({ id, data }) =>{
                                    return(
                                        <tr key={id}>
                                            <th>{data.username}</th>
                                            <th>{data.email}</th>
                                            <th>{data.authProvider}</th>
                                            <th>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        deleteAccountData(id);
                                                    }}
                                                >Delete</Button>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table> 
                </Tab>
                <Tab eventKey="users" title="Users account">
                    <Container className="tabTitle">User accounts management</Container>
                    <Button variant="primary" onClick={handleShowAddForm}>Add Users</Button>
                    <AddUserForm show={showAddForm} onHide={() => setShowAddForm(false)}/>
                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Provider</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData?.map(({ id, data }) =>{
                                    return(
                                        <tr key={id}>
                                            <th>{data.username}</th>
                                            <th>{data.email}</th>
                                            <th>{data.authProvider}</th>
                                            <th>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        deleteAccountData(id);
                                                    }}
                                                >Delete</Button>
                                            </th>
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
                            <th>Book title</th>
                            <th>Author</th>
                            <th>Day of public</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    </Table> 
                </Tab>
            </Tabs>
        </Container>
        
        </>
    )
    function AddUserForm(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const addUser = () => {
            adminAddUser(username, email, password);
            handleHideAddForm();
        };
        
        
        return(
            <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // backdrop="static"
                className="addUserModal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create User Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="formWrapper">
                        <Form className="adduserForm">
                            <Form.Group className="mb-3" >
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="username" 
                                    size="lg" 
                                    id="username"
                                    value={username}
                                    placeholder="Enter your Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    size="lg" 
                                    id="email" 
                                    value={email}
                                    placeholder="Enter your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    size="lg" 
                                    id="password"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" size="lg" onClick={addUser}>Add Account</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    function AddAdminForm(props) {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const addAdmin = () => {
            adminAddAdmin(username, email, password);
            handleHideAddAdminForm();
        };
        return(
            <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // backdrop="static"
                className="addAdminModal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Admin Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="formWrapper">
                        <Form className="adduserForm">
                            <Form.Group className="mb-3" >
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="username" 
                                    size="lg" 
                                    id="username"
                                    value={username}
                                    placeholder="Enter your Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    size="lg" 
                                    id="email" 
                                    value={email}
                                    placeholder="Enter your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    size="lg" 
                                    id="password"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" size="lg" onClick={addAdmin}>Add Account</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </>
        )
    }
}



