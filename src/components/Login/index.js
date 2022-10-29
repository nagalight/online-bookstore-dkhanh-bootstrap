import React, {useState, useEffect} from "react";
import {  Button, Container, Form, Modal, Alert } from "react-bootstrap";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import "./login.css"

import { useAuth } from "../../contexts/authContext";

export default function LoginForm(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState("none")
    const { logIn, loginWithGoogle } = useAuth()
    const loggingIn = (e) => {
        e.preventDefault();
        if (!email||!password){
            setError("Please enter all field to login")
        }else{
            try {
                logIn(email, password)
            } catch (error) {
                setError("Failed to login")
            }
        }
    }
    useEffect(() => {
        setError("")
    }, [props])
    useEffect(()=>{
        if(error !== ""){
            setShowError("block")
        }else{
            setShowError("none")
        }
        
    }, [error])

    return(
        <>
        <Modal
            {...props}
            size="md"
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
            <Alert variant={'danger'} style={{display:showError}}>{error}</Alert>
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
                            onClick={()=> loginWithGoogle()}
                            className="googleLogin"
                        > Login with Google</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}