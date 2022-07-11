import React from "react";
import {  Button, Container, Form } from "react-bootstrap";
import "./login.css"

export default function LoginForm(){
    return(
        <>
        <Container className="loginWrapper">
            <Container className="loginTitle">
                Login
            </Container>
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
        </>
    )
}