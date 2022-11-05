import React from "react";
import { Container } from "react-bootstrap";
import "./homepage.css";
import AdSlider from "../../components/AdSlider";
import LatestUpdateSlider from "../../components/HomePage/LatestUpdate";

export default function HomePage(){
    return(
        <>
        <AdSlider/>
        <Container>
            <Container>
                <LatestUpdateSlider/>
            </Container>
            <Container>
                <h3>Work in progress</h3>
            </Container>
        </Container>
        </>
    )
}