import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar, Form, Image, InputGroup, Offcanvas } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import "./navbarmobile.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowRightFromBracket, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'

import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useAuth } from "../../../contexts/authContext";

import LoginForm from "../../Login";
import RegisterForm from "../../Register";
import CartModal from "../../Cart";
import { Link } from "react-router-dom";


export default function NavigationBarMobile(props){
    const {cartItems, handleAddToCart, handleRemoveFromCart, clearCart} = props;
    const [showLogin, setShowLogin] = useState(false);
    const handleShowLogin = () => {
        setShowLogin(true);
        setShowOffCanvas(false);
    }

    const [showRegister, setShowRegister] = useState(false);
    const handleShowRegister = () => {
        setShowRegister(true);
        setShowOffCanvas(false);
    }

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
    const movePages = useNavigate()
    const handleSearchSubmit = () => {
        if (searchKeyword){
            movePages(`/searchResult/${searchKeyword}`)
        }
    }
    const [showSearchBar, setShowSearchBar] = useState("none")
    const [showNavBar, setShowNavBar] = useState("flex")
    const handleShowSearchBar = () => {
        setShowSearchBar("flex")
        setShowNavBar("none")
    }
    const handleHideSearchBar = () => {
            setShowSearchBar("none")
            setShowNavBar("flex")
    }
    const [showOffCanvas, setShowOffCanvas] = useState(false)

    return(
        <>
        <Navbar 
            bg="dark" 
            variant="dark" 
            className="NavigationbarMobile" 
            width="100%" 
            sticky="top"
            expand={false}
        >
            <Container style={{display:showNavBar}}>
                <Nav className="justify-content-start">
                    <Navbar.Toggle onClick={()=>setShowOffCanvas(true)} />
                    <Navbar.Offcanvas
                        id={'offcanvasNavbar-expand'}
                        aria-labelledby={'offcanvasNavbarLabel-expand'}
                        placement="start"
                        className="offcanvasNavbarMobile"
                        show={showOffCanvas}
                        // backdrop={true}
                        restoreFocus={false}
                    >
                        <Offcanvas.Header className="OffCanvasHeadContainer">
                            <Container className="OffCanvasDarkBackground_Header">
                                <Container style={{display:'flex', justifyContent:'end', padding:0}}>
                                    <FontAwesomeIcon icon={faX} className="OffCanvasLinkTextColor_header" style={{fontSize:'2vh', fontWeight:'bold'}} onClick={()=>setShowOffCanvas(false)}/>    
                                </Container>    
                                <Container className="userMobileContainer">
                                    <Container className="userImageMobileContainer">
                                        <Image className="userImageMobile" src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/Main%2FZA_default_avatar.png?alt=media&token=6b8f3631-2f60-4b33-9995-0822ef02621a"/>
                                    </Container>
                                    
                                    <Container className="userDisplayMobileContainer-Guest" style={{display:showNotLogedIn}}>
                                        <Container className="guestActionMobileContainer OffCanvasLinkTextColor_header">
                                            <Nav.Link onClick={handleShowLogin} className="OffCanvasLinkTextColor_header" style={{padding:0}}>Login</Nav.Link>
                                            &nbsp;/&nbsp;
                                            <Nav.Link onClick={handleShowRegister} className="OffCanvasLinkTextColor_header" style={{padding:0}}>Register</Nav.Link>
                                        </Container>
                                    </Container>

                                    <Container className="userDisplayMobileContainer-User" style={{display:showLogedIn}}>
                                        <Container className="userTitleMobileContainer OffCanvasLinkTextColor_header">
                                            Welcome, <Nav.Link style={{padding:'0', display:'unset'}}>{username}</Nav.Link>
                                        </Container>
                                        <Container className="userActionMobileContainer">
                                            <Nav.Link onClick={loggingOut} style={{padding:0}}>
                                                Log out
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="logOutIcon"/>
                                            </Nav.Link>
                                        </Container>
                                    </Container>
                                </Container>
                            </Container>
                            
                        </Offcanvas.Header>
                        <Offcanvas.Body className="OffCanvasBodyContainer">
                            <Nav className="OffCanvasCategory-wrapper">
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/books"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/books">Book</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Fiction"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Fiction">Fiction</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Non-Fiction"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Non-Fiction">Non-fiction</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Teen"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Teen">Teen</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Kid"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Kid">Kids</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Education"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Education">Education</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/genres/Magazine"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/genres/Magazine">Magazine</Nav.Link>
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="OffCanvasCategoryItems" onClick={()=>setShowOffCanvas(false)}>
                                    <Link to={"/inconstruction"} style={{textDecoration:"none"}}>
                                        <Nav.Link href="/inconstruction">Your Book</Nav.Link>
                                    </Link>
                                </Nav.Item>
                            </Nav>
                            <Container></Container>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Nav>
                <Nav>
                    <Link to={"/"} className="siteNameMobile">
                        <Image className="siteNameMobile_image" src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/Main%2Flogo192.png?alt=media&token=bd2a065f-ee30-48a7-a8aa-f49bd4cb694a"/>
                    </Link>
                </Nav>
                <Nav style={{flexDirection:'row'}}>
                    <Button variant="black" onClick={handleShowSearchBar}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="IconToggleMobile"/>
                    </Button>
                    <Button variant="black" onClick={handleShowCart}>
                        <FontAwesomeIcon icon={faCartShopping} className="IconToggleMobile"/>
                    </Button>
                    <CartModal 
                        show={showCart} 
                        onHide={()=>setShowCart(false)} 
                        cartItems={cartItems} 
                        handleAddToCart={handleAddToCart} 
                        handleRemoveFromCart={handleRemoveFromCart}
                        clearCart={clearCart}
                        setShowCart={setShowCart}
                    />
                </Nav>
            </Container>
            
            <Container className="searchBarMobileContainer" style={{display:showSearchBar}}>
                <Form className="NavbarMobile-Search" onSubmit={handleSearchSubmit}>
                    <InputGroup>
                        <Form.Control 
                            type="text" 
                            placeholder="Search"
                            className="mr-md-2" 
                            onChange={(e)=>{setSearchKeyword(e.target.value)}}  
                        />
                        {!searchKeyword ? 
                            <Button variant="outline-light" className="searchButton-Mobile">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon-Mobile"/>
                            </Button>
                            :
                            <Link to={`/searchResult/${searchKeyword}`}>
                                <Button variant="outline-light" className="searchButton-Mobile">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon-Mobile"/>
                                </Button>
                            </Link>
                        }
                    </InputGroup>
                </Form>
                <Button variant="black" onClick={handleHideSearchBar}>
                    <FontAwesomeIcon icon={faX} className="IconToggleMobile"/>
                </Button>
            </Container>
        </Navbar>
        <LoginForm show={showLogin} onHide={() => setShowLogin(false)}/>
        <RegisterForm show={showRegister} onHide={() => setShowRegister(false)}/>
        </>
    )
}