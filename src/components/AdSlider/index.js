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
                        src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/HomePage%2Fbookstoreslider1.png?alt=media&token=ca614da8-bbab-48b9-b33f-4906d20907be"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100 sliderImage"
                        src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/HomePage%2Fbookstoreslider1.png?alt=media&token=ca614da8-bbab-48b9-b33f-4906d20907be"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100 sliderImage"
                        src="https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/HomePage%2Fbookstoreslider1.png?alt=media&token=ca614da8-bbab-48b9-b33f-4906d20907be"
                    />
                </Carousel.Item>
                
            </Carousel>
        </Container>
        </>
    )
}