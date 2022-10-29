import React, {useEffect, useState} from "react";
import { Button, Container, Form, Modal, Alert } from "react-bootstrap";
import "./register.css";

import { useAuth } from "../../contexts/authContext";


export default function RegisterForm(props){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [termChecked, setTermChecked] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState("none")

    const { signUp } = useAuth()

    async function handleRegister(e) {
        e.preventDefault();
        if (!username||!password||!email){
            setError("Please enter all field to create account")
        }else if (password !== passwordConfirm){
            setError("Password confirmation must be the same as the password")
        }else if(termChecked === false){
            setError("You need to agree to the Term of service to be able to create an account")
        }else{
            try{
                await signUp(username, email, password);
                alert("Account has been create successfully")
            }catch(error){
                console.log(error)
                setError("Failed to create an account")
            }
        }
    };
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
            className="registerModal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={'danger'} style={{display:showError}}>{error}</Alert>
                <Container className="registerWrapper">
                    <Form className="registerForm" onSubmit={handleRegister}>
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
                        <Form.Group className="mb-3" >
                            <Form.Label>Password Confirmation:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="passwordConfirm"
                                value={passwordConfirm}
                                placeholder="Enter Password confirmation"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check 
                                type="checkbox" 
                                size="lg" 
                                id="registerCheckbox" 
                                label="You are agree to our Term of service"
                                checked={termChecked}
                                onChange={(e)=>{e.target.checked ? setTermChecked(true) : setTermChecked(false)}}
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg" type="summit">Register</Button> 
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}