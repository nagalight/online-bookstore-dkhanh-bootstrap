import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button, Form, Modal, Image } from "react-bootstrap";
import "./admin.css";

import { 
    db, 
    adminAddUser, 
    adminAddAdmin, 
    addBookToDatabase, 
    updateBookOnDatabase, 
    deleteBookOnDatabase, 
    getAllBooksData, 
    getBookData,
    bookStorage
} from "../../firebase";
import { collection, onSnapshot, where, query, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { async } from "@firebase/util";

export default function AdminManagement() {
    const [userData, setUserData] = useState([]);
    const [adminData, setAdminData] = useState([]);
    const [bookData, setBookData] = useState([]);
    

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

    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const handleShowAddBookForm = () => setShowAddBookForm(true);
    const handleShowHideBookForm = () => {
        setShowAddBookForm(false);
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
                    data: doc.data()
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
                    <Button onClick={handleShowAddBookForm}>Add Book</Button>
                    <AddBookForm show={showAddBookForm} onHide={() => setShowAddBookForm(false)}/>
                    <Table responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Book title</th>
                            <th>Author</th>
                            <th>Day of public</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookData?.map(({ id, data }) =>{
                                return(
                                    <tr key={id}>
                                        <th style={{width:'100px'}}>
                                            <Image src={data.image} className="bookCoverImage" />
                                        </th>
                                        <th>{data.title}</th>
                                        <th>{data.author}</th>
                                        <th>{data.publicDate}</th>
                                        <th>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    deleteBookOnDatabase(id);
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

    function AddBookForm(props){
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [publicDate, setPublicDate] = useState("");
        const [image, setImage] = useState(null);
        const [urlImage, setUrlImage] = useState("")

        const handleImageChange = (e) =>{
            if (e.target.files[0]){
                setImage(e.target.files[0]);
            }
        }

        const summitImage = async ()=>{
            const imageRef = ref(bookStorage, `BookCover/${image.name}`);
            await uploadBytes(imageRef, image).then(()=>{
                getDownloadURL(imageRef).then((url)=>{
                    setUrlImage(url);
                    console.log(urlImage); 
                }).catch(error =>{
                    console.log(error.message, "Error while getting the image url");
                });
            }).catch(error =>{
                console.log(error.message);
            });
        }

        const addingBook = {
            title,
            author,
            publicDate,
            image: urlImage
        }

        const handleBookSummit = () => {
                try{
                    addBookToDatabase(addingBook);
                    console.log("New book has been add successfully");
                    handleShowHideBookForm();
                }catch(error){
                    console.log(error);
                }
        }

        const inputValidation = async(e)=>{
            e.preventDefault();
            if (title === "" || author === "" || publicDate === "" || image == null){
                return console.log("All field need to be fill !!!");
            }
            loopSummit()
        }

        const loopSummit = () =>{
            if (urlImage === ""){
                summitImage();
            }else if (urlImage !== ""){
                handleBookSummit();
            }
        }

        useEffect(() => {
            loopSummit()
            // inputValidation()
        }, [urlImage])

        return(
            <>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="formWrapper">
                        <Form className="addBookForm" onSubmit={inputValidation}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book title:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="lg" 
                                    id="title"
                                    value={title}
                                    placeholder="Enter book title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Author:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="lg" 
                                    id="author" 
                                    value={author}
                                    placeholder="Enter book author"
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Date of Public:</Form.Label>
                                <Form.Control 
                                    type="Date" 
                                    size="lg" 
                                    id="publicDate"
                                    value={publicDate}
                                    placeholder="Enter Date"
                                    onChange={(e) => setPublicDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Cover:</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    size="lg" 
                                    id="bookCover"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>
                            <Button variant="primary" size="lg" type="Submit">Add Book</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </>
        )
    }
}



