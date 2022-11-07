import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./admin.css";
import AddUserForm from "../../components/Admin/AddUserForm";
import AddAdminForm from "../../components/Admin/AddAdminForm";
import AddBookForm from "../../components/Admin/AddBookForm";
import UpdateBookData from "../../components/Admin/UpdateBookData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faInfo, faUserSlash } from '@fortawesome/free-solid-svg-icons'

import { db, deleteBookOnDatabase } from "../../firebase";
import { collection, onSnapshot, where, query, doc, deleteDoc, getDocs } from "firebase/firestore";

import { useAuth } from "../../contexts/authContext"
import { Navigate, Link } from "react-router-dom"

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

    const [userData, setUserData] = useState([]);
    const [adminData, setAdminData] = useState([]);
    const [bookData, setBookData] = useState([]);
    
    const [showAddForm, setShowAddForm] = useState(false);
    const handleShowAddForm = () => setShowAddForm(true);

    const [showAddAdminForm, setShowAddAdminForm] = useState(false);
    const handleShowAddAdminForm = () => setShowAddAdminForm(true);

    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const handleShowAddBookForm = () => setShowAddBookForm(true);
    
    const [showUpdateBookForm, setShowUpdateBookForm] = useState(false);
    const handleShowUpdateBookForm = () => setShowUpdateBookForm(true);
    const handleHideUpdateBookForm = () => {
        setShowUpdateBookForm(false);
        setGetBookId("");
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

    const fetchBookData = () =>{
        const q = query(collection(db, "books"))
        onSnapshot(q,(querySnapshot)=>{
            setBookData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }
    
    useEffect(()=>{
        if (collection){
            fetchUserData();
            fetchAdminData();
            fetchBookData();
        }
    }, [])

    const deleteAccountData = (id) =>{
        deleteDoc(doc(db, "users", id ))
    }

    const [getBookId, setGetBookId] = useState("");

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
                                <Container className="tabTitle">Admin accounts management</Container>
                                <Button onClick={handleShowAddAdminForm}>Add Admin account</Button>
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
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 250, hide: 400 }}
                                                                overlay={<Tooltip id="button-tooltip-2">Delete this admin</Tooltip>}
                                                            >
                                                                <Button
                                                                    className="btnAction"
                                                                    variant="danger"
                                                                    onClick={() => {
                                                                        deleteAccountData(id);
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faUserSlash}/>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>    
                            </Container> 
                        </Tab>
        
                        <Tab eventKey="users" title="Users account">
                            <Container className="tabContainer">
                                <Container className="tabTitle">User accounts management</Container>
                                <Button variant="primary" onClick={handleShowAddForm}>Add Users</Button>
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
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                delay={{ show: 250, hide: 400 }}
                                                                overlay={<Tooltip id="button-tooltip-2">Delete this user</Tooltip>}
                                                            >
                                                                <Button
                                                                    className="btnAction"
                                                                    variant="danger"
                                                                    onClick={() => {
                                                                        deleteAccountData(id);
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faUserSlash}/>
                                                                </Button>
                                                            </OverlayTrigger>
                                                            
                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Container>
                        </Tab>
                        
                        <Tab eventKey="books" title="Books">
                            <Container className="tabContainer">
                                <Button onClick={handleShowAddBookForm}>Add Book</Button>
                                <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Book title</th>
                                        <th>Author</th>
                                        <th>Genre</th>
                                        <th>Publisher</th>
                                        <th>Day of public</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookData?.map(({ id, data }) =>{
                                            return(
                                                <tr key={id}>
                                                    <th style={{width:'100px'}}>
                                                        <Image src={data.image.url} className="bookCoverImage" />
                                                    </th>
                                                    <th>{data.title}</th>
                                                    <th>{data.author}</th>
                                                    <th className="genreTagContainer">
                                                        {
                                                            data.genre.map(genreData =>{
                                                                return(
                                                                    <Container className="tagContainer">{genreData}</Container>
                                                                )
                                                            })
                                                        }
                                                    </th>
                                                    <th>{data.publisher}</th>
                                                    <th>{data.publicDate}</th>
                                                    <th>{Number(data.price).toLocaleString("en-US",)} VND</th>
                                                    <th>{data.stock}</th>
                                                    <th style={{width:'130px'}}>
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={<Tooltip id="button-tooltip-2">Go to this book product site</Tooltip>}
                                                        >
                                                            <Link to={`/books/${id}`}>
                                                                <Button
                                                                    className="btnAction"
                                                                    variant="primary"
                                                                >
                                                                    <FontAwesomeIcon icon={faInfo}/>
                                                                </Button>
                                                            </Link>
                                                        </OverlayTrigger>
        
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={<Tooltip id="button-tooltip-2">Edit this book information</Tooltip>}
                                                        >
                                                            <Button
                                                                className="btnAction"
                                                                variant="secondary"
                                                                onClick={(e) => {
                                                                    setGetBookId(id)
                                                                    handleShowUpdateBookForm();
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faPenToSquare}/>
                                                            </Button>
                                                            
                                                        </OverlayTrigger>
                                                        
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={<Tooltip id="button-tooltip-2">Delete this book</Tooltip>}
                                                        >
                                                            <Button
                                                                className="btnAction"
                                                                variant="danger"
                                                                onClick={() => {
                                                                    deleteBookOnDatabase(id);
                                                                }}
                                                            >
                                                                <FontAwesomeIcon icon={faTrash}/>
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </th>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </Table>
                            </Container>
                             
                        </Tab>
                    </Tabs>
                </Container>
                <AddAdminForm show={showAddAdminForm} onHide={() => setShowAddAdminForm(false)}/>
                <AddUserForm show={showAddForm} onHide={() => setShowAddForm(false)}/>
                <AddBookForm show={showAddBookForm} onHide={() => setShowAddBookForm(false)}/>
                <UpdateBookData show={showUpdateBookForm} onHide={handleHideUpdateBookForm} getBookId={getBookId} setGetBookId={setGetBookId}/>
                </>
            )
        }else if (role === false){
            return <Navigate to="/404"/>
        }
    }else if (!currentUser){
        return <Navigate to="/404"/>
    }
}



