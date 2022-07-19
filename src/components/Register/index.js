import React, {useState} from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import "./register.css"

import {database} from '../../firebase'
import {ref,push,child,update} from "firebase/database";

export default function RegisterForm(props){
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [registerCheckbox, setRegisterCheckbox] = useState(false);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "username"){
            setUsername(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        if(id === "registerCheckbox"){
            setRegisterCheckbox(value);
        }
    }

    const handleSubmit  = () => {
        console.log(username,email,password,confirmPassword);
        let obj = {
            username : username,
            email : email,
            password : password,
            confirmPassword : confirmPassword,
        }
        const newPostKey = push(child(ref(database), 'posts')).key;
        const updates = {};
        updates['/' + newPostKey] = obj
        return update(ref(database), updates);
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
                    Register
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="registerWrapper">
                    <Form className="registerForm">
                        <Form.Group className="mb-3" >
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                type="username" 
                                size="lg" 
                                id="username"
                                placeholder="Enter your Username"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                size="lg" 
                                id="email" 
                                placeholder="Enter your Email"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="password" 
                                placeholder="Enter Password"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="confirmPassword" 
                                placeholder="Confirm Password"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check 
                                type="checkbox" 
                                size="lg" 
                                id="registerCheckbox" 
                                label="You are agree to our Term of service"
                                onChange = {(e) => handleInputChange(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg"  onClick={()=>handleSubmit()}>Register</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}