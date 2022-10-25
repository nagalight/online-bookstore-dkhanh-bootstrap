import React, {useState} from "react";
import {  Button, Container, Form, Modal } from "react-bootstrap";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import "./login.css"

export default function LoginForm(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loggingIn = () => {
        logInWithEmailAndPassword(email, password)
    }

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
                                }}
                            />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            // type="summit"
                            onClick={loggingIn}
                        >Login</Button>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={signInWithGoogle}
                            className="googleLogin"
                        > Login with Google</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}