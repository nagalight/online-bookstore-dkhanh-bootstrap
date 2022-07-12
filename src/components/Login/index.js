import React from "react";
import {  Button, Container, Form, Modal } from "react-bootstrap";
import "./login.css"

export default function LoginForm(props){
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
                        <Form.Group className="mb-3" controlId="formLoginUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="username" size="lg" placeholder="Enter your Username"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLoginPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" size="lg" placeholder="Enter Password"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="checkboxLoginKeeplogin">
                            <Form.Check type="checkbox" size="lg" label="Keep login"/>
                        </Form.Group>
                        <Button variant="primary" size="lg" type="summit">Login</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}