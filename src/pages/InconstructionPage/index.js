import React from "react";
import {  Container, Image } from "react-bootstrap";
import "./inconstruction.css"


export default function InconstructionPage(){
    return(
        <>
        <Container className="textWrapper">
            <Image src="images\InconstructionPage\construction.png" className="constructionIcon"/>
            <Container className="title_bigText">
                Page in Construction
            </Container>
            <Container className="title_smallText">
                We apology for this inconvinion
            </Container>
        </Container>
        </>
    )
}