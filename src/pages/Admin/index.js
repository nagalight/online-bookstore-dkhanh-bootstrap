import React, {useEffect, useState} from "react";
import { Container, Tab, Tabs, Table, Button, Form, Modal, Image, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./admin.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faInfo, faUserSlash, faXmark } from '@fortawesome/free-solid-svg-icons'

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
import { collection, onSnapshot, where, query, doc, deleteDoc, serverTimestamp, getDoc, getDocs} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { async } from "@firebase/util";

import { useAuth } from "../../contexts/authContext"
import { Navigate, Link } from "react-router-dom"

export default function AdminManagement() {
    const { currentUser } = useAuth()
    const [role, setRole] = useState(true);

    const fetchUserRole = async () =>{
        const q = query(collection(db, "users"), where("uid", "==", currentUser?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(data.isAdmin)
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
    const handleHideAddBookForm = () => {
        setShowAddBookForm(false);
    }
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
                                <AddBookForm show={showAddBookForm} onHide={() => setShowAddBookForm(false)}/>
                                <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Book title</th>
                                        <th>Author</th>
                                        <th>Genre</th>
                                        <th>Day of public</th>
                                        <th>Price</th>
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
                                                    <th>{data.publicDate}</th>
                                                    <th>{Number(data.price).toLocaleString("en-US",)} VND</th>
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
                                                                    onClick={() => {
                                                                        console.log("This book have the id of: " + id);
                                                                    }}
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
                <UpdateBookData show={showUpdateBookForm} onHide={() => setShowUpdateBookForm(false)}/>
                </>
            )
        }else if (role === false){
            return <Navigate to="/404"/>
        }
    }else if (!currentUser){
        return <Navigate to="/404"/>
    }

    
    
    
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
        const [genre, setGenre] = useState([]);
        const [publicDate, setPublicDate] = useState("");
        const [price, setPrice] = useState("");
        const [image, setImage] = useState(null);
        const [imageData, setImageData] = useState(
            {
                name: "",
                url: ""
            },
        );

        const handleImageChange = (e) =>{
            if (e.target.files[0]){
                setImage(e.target.files[0]);
            }
        }

        const summitImage = async ()=>{
            const imageRef = ref(bookStorage, `BookCover/${image.name}`);
            await uploadBytes(imageRef, image).then(()=>{
                getDownloadURL(imageRef).then((getUrl)=>{
                    setImageData(
                        {
                            name: image.name,
                            url: getUrl
                        },
                    );
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
            genre,
            publicDate,
            price,
            image: imageData,
            addDateTime: serverTimestamp()
        }

        const handleBookSummit = async () => {
                try{
                    await addBookToDatabase(addingBook);
                    console.log("New book has been add successfully");
                    handleHideAddBookForm();
                }catch(error){
                    console.log(error);
                }
        }

        const inputValidation = async(e)=>{
            e.preventDefault();
            if (title === "" || author === "" || publicDate === "" || genre === [] || price ==="" || image == null){
                return console.log("All field need to be fill !!!");
            }
            loopSummit()
        }

        const loopSummit = async() =>{
            if (imageData.url === ""){
                await summitImage();
            }else if (imageData.url !== ""){
                await handleBookSummit();
            }
        }

        useEffect(() => {
            loopSummit()
        }, [imageData.url])

        const testData = ()=>{
            console.log(image)
        }

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
                            <Form.Group className="mb-3" id="Title">
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

                            <Form.Group className="mb-3" id="Author">
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

                            <Form.Group className="mb-3" id="Genre">
                                <Form.Label>Genre:</Form.Label>
                                <Container className="gerneWrapper">
                                    <Container className="genreColumnContainer" id="fictionWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Fiction" 
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Fiction"): setGenre(genre.filter((a) =>(a !== "Fiction")))
                                            }}
                                        />
                                    </Container>
                                    <Container className="genreColumnContainer" id="nonFictionWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Non-Fiction"
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Non-Fiction"): setGenre(genre.filter((a) =>(a !== "Non-Fiction")))
                                            }}
                                        />
                                    </Container>
                                    <Container className="genreColumnContainer" id="teenWrapper">
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Teen"
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Teen"): setGenre(genre.filter((a) =>(a !== "Teen")))
                                        }}
                                        />
                                    </Container>
                                    <Container className="genreColumnContainer" id="kidWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Kid"
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Kid"): setGenre(genre.filter((a) =>(a !== "Kid")))
                                            }} 
                                        />
                                    </Container>
                                    <Container className="genreColumnContainer" id="educationWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Education"
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Education"): setGenre(genre.filter((a) =>(a !== "Education")))
                                            }}
                                        />
                                    </Container>
                                    <Container className="genreColumnContainer" id="magazineWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Magazine"
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Magazine"): setGenre(genre.filter((a) =>(a !== "Magazine")))
                                            }}
                                        />
                                    </Container>
                                </Container>
                            </Form.Group>

                            <Form.Group className="mb-3" id="PublicDate">
                                <Form.Label>Date of Public:</Form.Label>
                                <Form.Control 
                                    type="Date" 
                                    size="lg" 
                                    id="publicDate"
                                    value={publicDate}
                                    dateFormat="yyyy/MM/dd"
                                    placeholder="Enter Date"
                                    onChange={(e) => setPublicDate(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" id="Price">
                                <Form.Label>Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control 
                                        type="number" 
                                        size="lg" 
                                        id="price" 
                                        value={price}
                                        placeholder="Enter book price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <InputGroup.Text>VND</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" id="CoverImage">
                                <Form.Label>Book Cover:</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    size="lg" 
                                    id="bookCover"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>

                            <Button variant="primary" size="lg" type="Submit">Add Book</Button>
                            <Button variant="secondary" size="lg" onClick={testData}>Test Data</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </>
        )
    }

    function UpdateBookData(props){
        const [decoyData, setDecoyData] = useState("");
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [genre, setGenre] = useState([]);
        const [publicDate, setPublicDate] = useState("");
        const [price, setPrice] = useState("");
        const [image, setImage] = useState(null);
        const [imageData, setImageData] = useState(
            {
                name: "",
                url: ""
            },
        );
        const [imageUpdate, setImageUpdate] = useState(
            {
                name: "",
                url: ""
            },
        );

        const testId = () =>{
            console.log("The book data: " + genre)
        }

        const handleImageChange = (e) =>{
            if (e.target.files[0]){
                setImage(e.target.files[0]);
            }
        }

        const [checkedFiction, setCheckedFiction] = useState(false);
        const [checkedNonFiction, setCheckedNonFiction] = useState(false);
        const [checkedTeen, setCheckedTeen] = useState(false);
        const [checkedKid, setCheckedKid] = useState(false);
        const [checkedEducation, setCheckedEducation] = useState(false);
        const [checkedMagazine, setCheckedManazine] = useState(false);

        const handleGetBookData = async() =>{
            console.log("The book currently editing: " + getBookId)
            try {
                const bookDoc = doc(db,"books", getBookId)
                const snapBookData = await getDoc(bookDoc)
                if (snapBookData.exists()) {
                    console.log("Document data:", snapBookData.data());
                } else {
                    console.log("No such document!");
                }
                
                setTitle(snapBookData.data().title)
                setAuthor(snapBookData.data().author)
                setGenre(snapBookData.data().genre)
                setPublicDate(snapBookData.data().publicDate)
                setPrice(snapBookData.data().price)
                setImageData(snapBookData.data().image)

                setDecoyData(snapBookData.data().title)
            } catch (error) {
                console.log (error)
            }
        }

        const handleGetGenreChecked=()=>{
            setCheckedFiction(genre.includes("Fiction"));
            setCheckedNonFiction(genre.includes("Non-Fiction"));
            setCheckedTeen(genre.includes("Teen"));
            setCheckedKid(genre.includes("Kid"));
            setCheckedEducation(genre.includes("Education"));
            setCheckedManazine(genre.includes("Magazine"));
        }

        const updateBookWithoutImageChange = {
            title: title,
            author: author,
            genre: genre,
            publicDate: publicDate,
            price: price,
            image: imageData
        }
        const updateBookWithImageChange = {
            title: title,
            author: author,
            genre: genre,
            publicDate: publicDate,
            price: price,
            image: imageUpdate
        }

        const summitImage = async ()=>{
            const imageRef = await ref(bookStorage, `BookCover/${image.name}`);
            await uploadBytes(imageRef, image).then(()=>{
                getDownloadURL(imageRef).then((getUrl)=>{
                    setImageUpdate(
                        {
                            name: image.name,
                            url: getUrl
                        },
                    ); 
                    console.log(imageData); 
                }).catch(error =>{
                    console.log(error.message, "Error while getting the image url");
                });
            }).catch(error =>{
                console.log(error.message);
            });
        }
        const handleBookUpdate = async() => {
            try{
                if (image === null){
                    await updateBookOnDatabase(getBookId, updateBookWithoutImageChange);
                    console.log(`Book with the id of ${getBookId} has been update successfully`);
                }else if (image !== null){
                    await updateBookOnDatabase(getBookId, updateBookWithImageChange);
                    console.log(`Book with the id of ${getBookId} has been update successfully`);
                }
                handleHideUpdateBookForm();
            }catch(error){
                console.log(error);
            }
    }

        const updateValidation = async(e)=>{
            e.preventDefault();
            if (title === "" || author === "" || publicDate === "" || genre === [] || price ===""){
                return console.log("All field need to be fill !!!");
            }
            loopSummit()
        }

        const loopSummit = async() =>{
            if (image === null){
                await handleBookUpdate();
            }else if (image !==null){
                if (imageUpdate.url === ""){
                    await summitImage();
                }else if (imageUpdate.url !== ""){
                    await handleBookUpdate();
                }
            }
        }

        useEffect(() => {
            updateValidation()
        }, [imageUpdate.url])

        useEffect(() => {
          if (getBookId !== "" && getBookId !== undefined){
            handleGetBookData()
          }
          handleGetGenreChecked()
        }, [getBookId, decoyData])

        const handleCloseModal = () =>{
            handleHideUpdateBookForm();
            setGetBookId("")
        }
        
        return(
            <>
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Book Data
                    </Modal.Title>
                    <Button variant="light" onClick={handleCloseModal}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Container className="formWrapper">
                        <Form className="addBookForm" onSubmit={updateValidation}>
                            <Form.Group className="mb-3" id="Title">
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

                            <Form.Group className="mb-3" id="Author">
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

                            <Form.Group className="mb-3" id="Genre">
                                <Form.Label>Genre:</Form.Label>
                                <Container className="gerneWrapper">
                                    <Container className="genreColumnContainer" id="fictionWrapper">
                                        <Form.Check 
                                            type="checkbox"
                                            label="Fiction"
                                            checked={checkedFiction}
                                            onClick={()=> setCheckedFiction(!checkedFiction)}
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Fiction") : setGenre(genre.filter((a) =>(a !== "Fiction")))
                                            }}
                                        />
                                    </Container>

                                    <Container className="genreColumnContainer" id="nonFictionWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Non-Fiction"
                                            checked={checkedNonFiction}
                                            onClick={()=> setCheckedNonFiction(!checkedNonFiction)}
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Non-Fiction"): setGenre(genre.filter((a) =>(a !== "Non-Fiction")))
                                            }}
                                            // onChange={(e)=>{
                                            //     e.target.checked ? genre. : setGenre(genre.filter((a) =>(a !== "Fiction")))
                                            // }}
                                        />
                                    </Container>

                                    <Container className="genreColumnContainer" id="teenWrapper">
                                        <Form.Check 
                                        type="checkbox" 
                                        label="Teen"
                                        checked={checkedTeen}
                                        onClick={()=> setCheckedTeen(!checkedTeen)}
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Teen"): setGenre(genre.filter((a) =>(a !== "Teen")))
                                        }}
                                        />
                                    </Container>

                                    <Container className="genreColumnContainer" id="kidWrapper">
                                        <Form.Check 
                                            type="checkbox"
                                            label="Kid"
                                            checked={checkedKid}
                                            onClick={()=> setCheckedKid(!checkedKid)}
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Kid"): setGenre(genre.filter((a) =>(a !== "Kid")))
                                            }} 
                                        />
                                    </Container>
                                    
                                    <Container className="genreColumnContainer" id="educationWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Education"
                                            checked={checkedEducation}
                                            onClick={()=> setCheckedEducation(!checkedEducation)}
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Education"): setGenre(genre.filter((a) =>(a !== "Education")))
                                            }}
                                        />
                                    </Container>

                                    <Container className="genreColumnContainer" id="magazineWrapper">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Magazine"
                                            checked={checkedMagazine}
                                            onClick={()=> setCheckedManazine(!checkedMagazine)}
                                            onChange={(e)=>{
                                                e.target.checked ? genre.push("Magazine"): setGenre(genre.filter((a) =>(a !== "Magazine")))
                                            }}
                                        />
                                    </Container>
                                </Container>
                            </Form.Group>

                            <Form.Group className="mb-3" id="PublicDate">
                                <Form.Label>Date of Public:</Form.Label>
                                <Form.Control 
                                    type="Date" 
                                    size="lg" 
                                    id="publicDate"
                                    value={publicDate}
                                    dateFormat="yyyy/MM/dd"
                                    placeholder="Enter Date"
                                    onChange={(e) => setPublicDate(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" id="Price">
                                <Form.Label>Price:</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control 
                                        type="number" 
                                        size="lg" 
                                        id="price" 
                                        value={price}
                                        placeholder="Enter book price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <InputGroup.Text>VND</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" id="CoverImage">
                                <Form.Label>Book Cover:</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    size="lg" 
                                    id="bookCover"
                                    onChange={handleImageChange}
                                />
                                <Container>(The curent image being save is: {imageData.name})</Container>
                            </Form.Group>

                            <Button variant="primary" size="lg" type="Submit">Update Book</Button>
                            <Button variant="secondary" size="lg" onClick={testId}> Test Book Id</Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            </>
        )
    }
}



