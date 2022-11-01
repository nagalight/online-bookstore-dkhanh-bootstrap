import React, { useState, useEffect } from "react";
import {  Button, Container, Nav, Navbar, Form, Image, InputGroup } from "react-bootstrap";
import "./navbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass, faArrowRightFromBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons'

import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useAuth } from "../../contexts/authContext";

import LoginForm from "../Login";
import RegisterForm from "../Register";
import CartModal from "../Cart";
import { Link } from "react-router-dom";


export default function NavigationBar(){
    const [showLogin, setShowLogin] = useState(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleShowRegister = () => setShowRegister(true);

    const [showCart, setShowCart] = useState(false);
    const handleShowCart = () => setShowCart(true);

    const [user] = useAuthState(auth);
    const [username, setUsername] = useState("");

    const [showNotLogedIn, setShowNotLogedIn] = useState("none");
    const [showLogedIn, setShowLogedIn] = useState("none");
    const [role, setRole] = useState(false);
    const [showManage, setShowManage] = useState("none");
    
    const fetchUserName = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setUsername(data.username);
    }
    const fetchUserRole = async () =>{
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        // console.log(data.isAdmin)
        setRole(data.isAdmin);
        // console.log(role); 
    }
    const logedInDisplay=()=>{
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setShowLogedIn("block");
                setShowNotLogedIn("none");
                setShowLogin(false) && setShowRegister(false);
                console.log("Loged In");
                setShowManage("none");
                if (role === true){
                    console.log("This is an Admin account");
                    setShowManage("block");
                }else{
                    console.log("This is an User account");
                    setShowManage("none");
                }
            } else if(!users) {
                setShowLogedIn("none");
                setShowNotLogedIn("block");
                setShowManage("none");
                console.log("Not Loged In") 
            }
        })
    }
    useEffect(() => {
        fetchUserRole()
        .then(()=>fetchUserName())
        .finally(() => logedInDisplay());
    }, [user, role]);

    const { logout } = useAuth()

    const loggingOut= () => {
        try{
            logout();
        }catch(e){
            console.log(e)
        }
    }

    const test = () => {
        console.log(user.email)
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
                                Location: VN    
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Language: English</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Q&a</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Link to={"/admin"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/admin" style={{display:showManage}}>Manage</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link onClick={test}>Test Function</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end Nav-Firstline">
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Darkmode</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>

                <Container className="Navhead">
                    <Link to={"/"} className="siteName">
                        <Image className="siteName_image" src="images\Navbar\ZAicon192.png"/>
                        <Navbar.Brand style={{ fontSize:'27px' }}>Bookstore</Navbar.Brand>
                    </Link>
                    
                    <Form className="Navbar-Search">
                        <InputGroup>
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-light" className="searchButton">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                            </Button>
                        </InputGroup>
                    </Form>
                    <Container style={{width:"fit-content", height:"fit-content", marginLeft:"10px"}} onClick={handleShowCart}>
                        <FontAwesomeIcon icon={faCartShopping} style={{color:"white", fontSize:"20px"}}/>
                    </Container>
                    <CartModal show={showCart} onHide={()=>setShowCart(false)}/>
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
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Book</Nav.Link>
                            </Link>
                            
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Fiction</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Nonfiction</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Teen</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Kids</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Education</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                        <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                            <Nav.Link href="/inconstruction">Magazine</Nav.Link>
                        </Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-start Category-wrapper">
                        <Nav.Item >
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Your Library</Nav.Link>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Container>     
        </>
    )
}