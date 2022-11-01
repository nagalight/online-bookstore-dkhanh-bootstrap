import React from "react";
import { Container } from "react-bootstrap";
import "./homepage.css";
import AdSlider from "../../components/AdSlider";

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
                <HomeSliderLatest/>
            </Container>
        </Container>
        </>
    )
    function HomeSliderLatest(){
        return(
            <>
            </>
        )
    }
}