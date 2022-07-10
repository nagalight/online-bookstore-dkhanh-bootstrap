import React from "react";
import {  Container } from "react-bootstrap";
import "./notfound.css"

export default function NotFoundPage(){
    return(
        <>
        <Container>
            <Container>
                <h1>404</h1>
            </Container>
            <Container>
                <h2>Page not exist.</h2>
            </Container>
        </Container>
        </>
    )
}