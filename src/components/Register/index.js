import React, {useState} from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import "./register.css";

import { registerWithEmailAndPassword } from '../../firebase';


export default function RegisterForm(props){
    const [summitModalShow, setSummitModalShow] = React.useState(false);
    const handleShowSummitModal = () => setSummitModalShow(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const register = () => {
        if (!username) 
            alert("Please enter username");
        registerWithEmailAndPassword(username, email, password);
        handleShowSummitModal();
    };

    return(
        <>
        <Modal
            {...props}
            size="lg"
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
                <Container className="registerWrapper">
                    <Form className="registerForm">
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
                            <Form.Check 
                                type="checkbox" 
                                size="lg" 
                                id="registerCheckbox" 
                                label="You are agree to our Term of service"
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg" onClick={register}>Register</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="summitModal"
            show={summitModalShow}
            onHide={() => setSummitModalShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Aleart
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Account has been successfully created</p>
            </Modal.Body>
        </Modal>
        </>
    )
}