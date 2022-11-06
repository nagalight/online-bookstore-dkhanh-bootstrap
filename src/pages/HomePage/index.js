import React from "react";
import { Container } from "react-bootstrap";
import "./homepage.css";
import AdSlider from "../../components/AdSlider";
import LatestUpdateSlider from "../../components/HomePage/LatestUpdate";
import GenreSlider1 from "../../components/HomePage/GenreSlider1";
import GenreSlider2 from "../../components/HomePage/GenreSlider2";
import GenreSlider3 from "../../components/HomePage/GenreSlider3";

export default function HomePage(){
    return(
        <>
        <AdSlider/>
        <Container>
            <Container>
                <LatestUpdateSlider/>
                <GenreSlider1/>
                <GenreSlider2/>
                <GenreSlider3/>
            </Container>
        </Container>
        </>
    )
}