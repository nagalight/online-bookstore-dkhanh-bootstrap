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
import { Link, Navigate } from "react-router-dom";


export default function NavigationBar(props){
    const {cartItems, handleAddToCart, handleRemoveFromCart, clearCart} = props;
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
        setRole(data.isAdmin);
    }
    const logedInDisplay=()=>{
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setShowLogedIn("block");
                setShowNotLogedIn("none");
                setShowLogin(false) && setShowRegister(false);
                setShowManage("none");
                if (role === true){
                    setShowManage("block");
                }else{
                    setShowManage("none");
                }
            } else if(!users) {
                setShowLogedIn("none");
                setShowNotLogedIn("block");
                setShowManage("none");
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

    const [searchKeyword, setSearchKeyword] = useState("")

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
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>{setSearchKeyword(e.target.value)}}/>
                            {!searchKeyword ? 
                                <Button variant="outline-light" className="searchButton">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                                </Button>
                                :
                                <Link to={`/searchResult/${searchKeyword}`}>
                                    <Button variant="outline-light" className="searchButton">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                                    </Button>
                                </Link>
                            }
                        </InputGroup>
                    </Form>
                    <Container style={{width:"fit-content", height:"fit-content", marginLeft:"10px"}} onClick={handleShowCart}>
                        <FontAwesomeIcon icon={faCartShopping} style={{color:"white", fontSize:"20px"}}/>
                    </Container>
                    <CartModal 
                        show={showCart} 
                        onHide={()=>setShowCart(false)} 
                        cartItems={cartItems} 
                        handleAddToCart={handleAddToCart} 
                        handleRemoveFromCart={handleRemoveFromCart}
                        clearCart={clearCart}
                    />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="notLogin" style={{display:showNotLogedIn}}>
                            <a onClick={handleShowLogin}>Login</a>/<a onClick={handleShowRegister}>Register</a>

                            <LoginForm show={showLogin} onHide={() => setShowLogin(false)}/>
                            <RegisterForm show={showRegister} onHide={() => setShowRegister(false)}/>
                        </Navbar.Text>
                        <Navbar.Text className="wellcomeUser" style={{display:showLogedIn}}>
                            Welcome, <Nav.Link style={{padding:'0', display:'unset'}}>{username}</Nav.Link>
                            <Button variant="danger" size="sm" className="logOutButton" onClick={loggingOut}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="logOutIcon"/>
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <Container>
                    <Nav bg="dark" variant="dark" className="justify-content-start Category-wrapper">
                        <Nav.Item className="categoryItems">
                            <Link to={"/books"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/books">Book</Nav.Link>
                            </Link>
                            
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/genres/Fiction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/genres/Fiction">Fiction</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/genres/Non-Fiction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/genres/Non-Fiction">Non-fiction</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/genres/Teen"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/genres/Teen">Teen</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/genres/Kid"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/genres/Kid">Kids</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Link to={"/genres/Education"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/genres/Education">Education</Nav.Link>
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                        <Link to={"/genres/Magazine"} style={{textDecoration:"none"}}>
                            <Nav.Link href="/genres/Magazine">Magazine</Nav.Link>
                        </Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-start Category-wrapper">
                        <Nav.Item >
                            <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                <Nav.Link href="/inconstruction">Your Book</Nav.Link>
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Container>     
        </>
    )
}