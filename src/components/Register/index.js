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

    const handleSubmit  = () => {
        // console.log(registerInput.username,registerInput.email,registerInput.password ,registerInput.confirmPassword);
        let obj = {
            username : registerInput.username,
            email : registerInput.email,
            password : registerInput.password,
            confirmPassword : registerInput.confirmPassword,
        }
        const newPostKey = push(child(ref(database), 'posts')).key;
        const updates = {};
        updates['/' + newPostKey] = obj
        return update(ref(database), updates);
    }

    const [registerInput, setRegisterInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [registerError, setRegisterError] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onRegisterInputChange = e => {
        const { id, value } = e.target;
        setRegisterInput(prev => ({
            ...prev,
            [id]: value
          }));
          console.log(value)
          validateRegisterInput(e);
    }

    const validateRegisterInput = e =>{
        let { id,value } = e.target;
        setRegisterError(prev => {
            const stateObj = { ...prev, [id]: "" };
         
            switch (id) {
                case "username":
                    if (!value) {
                        stateObj[id] = "Please enter Username.";
                    }
                    break;
                
                case "email":
                    if(!value) {
                        stateObj[id] = "Please enter Email.";
                    }
         
                case "password":
                    if (!value) {
                        stateObj[id] = "Please enter Password.";
                    } else if (registerInput.confirmPassword && value !== registerInput.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = registerInput.confirmPassword ? "" : registerError.confirmPassword;
                    }
                    break;
         
                case "confirmPassword":
                    if (!value) {
                        stateObj[id] = "Please enter Confirm Password.";
                    } else if (registerInput.password && value !== registerInput.password) {
                        stateObj[id] = "Password and Confirm Password does not match.";
                    }
                    break;
         
                default:
                    break;
            }
         
            return stateObj;
        });
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
                                value={registerInput.username}
                                placeholder="Enter your Username"
                                onChange={onRegisterInputChange}
                                onBlur={validateRegisterInput}
                            />
                            {registerError.username && <span className='register_err'>{registerError.username}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                size="lg" 
                                id="email" 
                                value={registerInput.email}
                                placeholder="Enter your Email"
                                onChange={onRegisterInputChange}
                                onBlur={validateRegisterInput}
                            />
                            {registerError.email && <span className='register_err'>{registerError.email}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="password"
                                value={registerInput.password}
                                placeholder="Enter Password"
                                onChange={onRegisterInputChange}
                                onBlur={validateRegisterInput}
                            />
                            {registerError.password && <span className='register_err'>{registerError.password}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="confirmPassword"
                                value={registerInput.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={onRegisterInputChange}
                                onBlur={validateRegisterInput}
                            />
                            {registerError.confirmPassword && <span className='register_err'>{registerError.confirmPassword}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check 
                                type="checkbox" 
                                size="lg" 
                                id="registerCheckbox" 
                                label="You are agree to our Term of service"
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg" onClick={()=>handleSubmit()}>Register</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}