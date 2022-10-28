import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./footer.css"

export default function Footer(){
    return(
        <>
        <Container className="footerWrapper bg-dark">
            <Container className="grid_wrapper">
                <Row>
                    <Col>
                        <Image className="site_footer_image" src="images\Navbar\ZAicon192.png"/>
                        <Container className="grid_column"></Container>
                    </Col>
                    <Col>
                        <Container className="grid_column">
                            <Container className="column_item_title_second"></Container>
                            <Container className="column_item">
                                Read me 
                            </Container>
                            <Container className="column_item">
                                About us 
                            </Container>
                            <Container className="column_item">
                                Contact us 
                            </Container>
                            <Container className="column_item">
                                Term of service 
                            </Container>
                        </Container>
                    </Col>
                    <Col>
                        <Container className="grid_column">
                            <Container className="column_item_title">
                                CUSTUMER SERVICE
                            </Container>
                            <Container className="column_item">
                                Address: xx, xx Street, DaNang city, VN
                            </Container>
                            <Container className="column_item">
                                Hotline: 1900 xxxx xx
                            </Container>
                            <Container className="column_item">
                                Email: khanhld1511@gmail.com
                            </Container>
                        </Container>
                    </Col>
                    <Col>
                        <Container className="grid_column">
                            <Container className="column_item_title">
                                ENTERPRISE COOPERATION
                            </Container>
                            <Container className="column_item">
                                Hotline: 1900 xxxx xx
                            </Container>
                            <Container className="column_item">
                                Email: khanhld1511@gmail.com
                            </Container>
                        </Container>
                    </Col>
                    <Col></Col>
                    
                </Row>
            </Container>
            <Container className="footer_Credit">
                This website is develop by Mr.Le Dinh Khanh
            </Container>
        </Container>
        </>
    )
}