import React from "react";
import "./adslider.css"
import { Container, Carousel, Image } from "react-bootstrap";

export default function AdSlider(){
    return(
        <>
        <Container className="adSliderWrapper">
            <Carousel variant="dark" className="adSlider">
                <Carousel.Item>
                    <Image
                        className="d-block w-100 sliderImage"
                        src="images\Navbar\fgolb.jpg"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100 sliderImage"
                        src="images\Navbar\bookstoreslider1.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100 sliderImage"
                        src="images\Navbar\bookstoreslider1.png"
                    />
                </Carousel.Item>
                
            </Carousel>
        </Container>
        </>
    )
}