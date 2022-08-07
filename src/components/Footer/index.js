import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css"

export default function Footer(){
    return(
        <>
        <Container className="footerWrapper bg-dark">
            <Container className="footerText">
                This is the Footer
            </Container>
        </Container>
        </>
    )
}