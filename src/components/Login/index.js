import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Button, Container, Form, Modal } from "react-bootstrap";
import { auth, logInWithEmailAndPassword } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css"

export default function LoginForm(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="loginWrapper">
                    <Form className="loginForm">
                        <Form.Group className="mb-3" controlId="formLoginEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                size="lg" 
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLoginPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkboxLoginKeeplogin">
                            <Form.Check 
                                type="checkbox" 
                                size="lg" 
                                label="Keep login"
                                onChange={(event) =>{
                                    const value = event.target.checked;
                                    setLoginState({...loginState, saveLoginState:value})
                                }}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            // type="summit"
                            onClick={() => logInWithEmailAndPassword(email, password)} 
                        >Login</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}