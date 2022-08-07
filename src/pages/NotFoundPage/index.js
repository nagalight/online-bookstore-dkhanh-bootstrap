import React from "react";
import {  Container } from "react-bootstrap";
import "./notfound.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'

export default function NotFoundPage(){
    return(
        <>
        <Container className="textWrapper">
            <Container>
                <FontAwesomeIcon icon={faFaceFrown} className="sadIcon"/>
            </Container>
            <Container className="bigText">
                Oops
            </Container>
            <Container className="smallText">
                You are not supose to be here. Press <a className="homeLink">here</a> to go back to Home Page
            </Container>
        </Container>
        </>
    )
}