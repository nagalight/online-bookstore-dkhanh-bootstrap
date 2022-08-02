import React from "react";
import { Container } from "react-bootstrap";
import "./homepage.css";
import AdSlider from "../../components/AdSlider";
import LoginForm from "../../components/Login";
import RegisterForm from "../../components/Register";

export default function HomePage(){
    return(
        <>
        <AdSlider/>
        <Container>
            <Container>
                <h1>This is Home page</h1>
            </Container>
            <Container>
                <h3>Work in progress</h3>
            </Container>
        </Container>
        <LoginForm/>
        <RegisterForm/>
        </>
    )
}