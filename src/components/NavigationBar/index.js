import React, { useState } from "react";
import {  Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import "./navbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import LoginForm from "../Login";
import RegisterForm from "../Register";


export default function NavigationBar(){
    const [showLogin, setShowLogin] = useState(false);
    const handleShowLogin = () => setShowLogin(true);

    const [showRegister, setShowRegister] = useState(false);
    const handleShowRegister = () => setShowRegister(true);

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
                            <Nav.Link>Language</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="Nav-FirstlineItems">
                            <Nav.Link>Q&a</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end Nav-Firstline">
                        <Nav.Item className="Nav-FirstlineItems">
                            {/* <Button bg="dark" variant="dark" className="DarkmodeSwitch">Darkmode</Button> */}
                            <Nav.Link>Darkmode</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>

                <Container className="Navhead">
                    <Navbar.Brand style={{ fontSize:'27px' }}>ZA-Bookstore</Navbar.Brand>
                    <Form inline className="Navbar-Search">
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                    <Button variant="outline-success" className="searchButton">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                    </Button>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a onClick={handleShowLogin}>Login</a>/<a onClick={handleShowRegister}>Register</a>

                            <LoginForm show={showLogin} onHide={() => setShowLogin(false)}/>
                            <RegisterForm show={showRegister} onHide={() => setShowRegister(false)}/>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <Container>
                    <Nav bg="dark" variant="dark" className="justify-content-start Category-wrapper">
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Book</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Fiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Nonfiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">eBooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Audiobooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Teen</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="categoryItems">
                            <Nav.Link href="#">Kids</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-start Category-wrapper">
                        <Nav.Item >
                            <Nav.Link href="#">Your Library</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Container>     
        </>
    )
}