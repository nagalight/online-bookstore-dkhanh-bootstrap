import React from "react";
import {  Container, Image } from "react-bootstrap";
import "./inconstruction.css"


export default function InconstructionPage(){
    return(
        <>
        <Container className="textWrapper">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/Main%2Fconstruction.jpg?alt=media&token=0e5f39e1-c090-4ce9-a9a4-fd2e73b63220" 
                className="constructionIcon"
            />
            <Container className="title_bigText">
                Page is under Construction
            </Container>
            <Container className="title_smallText">
                We apology for this inconvinion
            </Container>
        </Container>
        </>
    )
}