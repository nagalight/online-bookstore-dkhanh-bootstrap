import React, { useState, useEffect } from "react";
import {  Button, Container, Nav, Navbar, Form, Image } from "react-bootstrap";
import "./navbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import LoginForm from "../Login";
import RegisterForm from "../Register";


export default function NavigationBar(){
    const [showLogin, setShowLogin] = useState(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleShowRegister = () => setShowRegister(true);

    const [user, loading, error] = useAuthState(auth);
    const [username, setUsername] = useState("");
    const fetchUserName = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUsername(data.username);
    }
    useEffect(() => {
        if (loading) return;
        fetchUserName();
    }, [user, loading]);

    const [showNotLogedIn, setShowNotLogedIn] = useState(null);
    const [showLogedIn, setShowLogedIn] = useState(null);
    
    useEffect(() =>{
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setShowLogedIn("block");
                setShowNotLogedIn("none");
                setShowLogin(false) && setShowRegister(false);
                console.log("Loged In")
            } else if(!users) {
                setShowLogedIn("none");
                setShowNotLogedIn("block");
                console.log("Not Loged In")
            }
        });
    },[]);

    const loggingOut= () => {
        logout();
        window.location.reload()
    }

    return(
        <>
        <Container className="Navbar-wrapper" fixed="top">
            <Navbar bg="dark" variant="dark" className="Navigationbar" width="100%">
                <Container>
                    <Nav className="justify-content-start Nav-Firstline">
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>
                                <FontAwesomeIcon icon={faGlobe} className="locationIcon"/>
                                Location    
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Language: English</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Q&a</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link href="/admin">Manage</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end Nav-Firstline">
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Darkmode</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>

                <Container className="Navhead">
                    <a href="/" className="siteName">
                        <Image className="siteName_image" src="images\Navbar\ZAicon192.png"/>
                        <Navbar.Brand style={{ fontSize:'27px' }}>Bookstore</Navbar.Brand>
                    </a>
                    
                    <Form className="Navbar-Search">
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                    <Button variant="outline-success" className="searchButton">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                    </Button>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="notLogin" style={{display:showNotLogedIn}}>
                            <a onClick={handleShowLogin}>Login</a>/<a onClick={handleShowRegister}>Register</a>

                            <LoginForm show={showLogin} onHide={() => setShowLogin(false)}/>
                            <RegisterForm show={showRegister} onHide={() => setShowRegister(false)}/>
                        </Navbar.Text>
                        <Navbar.Text className="wellcomeUser" style={{display:showLogedIn}}>
                            Wellcome, <Nav.Link style={{padding:'0', display:'unset'}}>{username}</Nav.Link>
                            <Button variant="danger" size="sm" className="logOutButton" onClick={loggingOut}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="logOutIcon"/>
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <Container>
                    <Nav bg="dark" variant="dark" className="justify-content-start Category-wrapper">
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Book</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Fiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Nonfiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">eBooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Audiobooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Teen</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="/inconstruction">Kids</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-start Category-wrapper">
                        <Nav.Item >
                            <Nav.Link href="/inconstruction">Your Library</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Container>     
        </>
    )
}