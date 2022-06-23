import React from "react";
import { Container, Button, Nav, Navbar } from "react-bootstrap";
import "./navbar.css"

export default function NavigationBar(){
    return(
        <>
        <Container className="Navbar-wrapper" fixed="top">
            <Navbar bg="dark" variant="dark" className="Navigationbar" width="100%">
                <Container className="Navhead">
                    <Navbar.Brand>ZA-Bookstore</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="#">Login</a>/<a href="#">Register</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <Button bg="dark" variant="dark" className="DarkmodeSwitch">Darkmode</Button>
                </Container>
                <Container>
                    <Nav bg="dark" variant="dark" className="justify-content-start Category-wrapper">
                        <Nav.Item>
                            <Nav.Link href="#">Book</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Fiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Nonfiction</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">eBooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Audiobooks</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Teen</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Kids</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="justify-content-end">
                            <Nav.Link href="#">Your Library</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </Container>
        {/* <br/> */}
        
        
        </>
    )
}