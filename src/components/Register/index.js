import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./register.css"

export default function RegisterForm(){
    return(
        <>
        <Container className="registerWrapper">
            <Container className="registerTitle">
                Register
            </Container>
            <Form className="registerForm">
                <Form.Group className="mb-3" controlId="formRegisterUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="username" size="lg" placeholder="Enter your Username"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" size="lg" placeholder="Enter your Email"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegisterPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" size="lg" placeholder="Enter Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRegisterReEnterPassword">
                    <Form.Label>Re-enter Password:</Form.Label>
                    <Form.Control type="password" size="lg" placeholder="Re-Enter Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="checkboxRegister">
                    <Form.Check type="checkbox" size="lg" label="You are agree to our Term of service"/>
                </Form.Group>
                <Button variant="primary" size="lg" type="summit">Register</Button>
            </Form>
        </Container>
        </>
    )
}