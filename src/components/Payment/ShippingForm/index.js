import React, { useState, useEffect } from 'react'
import { Alert, Button, Container, Col, Form, Row } from 'react-bootstrap';

import { addOrderToDatabase } from "../../../firebase";

export default function ShippingForm(props) {
    const {
        shippingPrice, 
        setShippingPrice, 
        setShowShippingForm, 
        setShowPaymentMethod,
        fullName,
        setFullName,
        shippingCountry,
        setShippingCountry,
        phoneNumber,
        setPhoneNumber,
        shippingAddress,
        setShippingAddress,
        shippingCity,
        setShippingCity,
        shippingZipCode,
        setShippingZipCode,
        shippingOrderDetail
    } = props;

    const [error, setError] = useState("");
    const [showError, setShowError] = useState("none")
    useEffect(() => {
        setError("")
    }, [props])
    useEffect(()=>{
        if(error !== ""){
            setShowError("block")
        }else{
            setShowError("none")
        }  
    }, [error])

    const shippingFormInputValidation = async(e)=>{
        // e.preventDefault();
        if (fullName === "" || phoneNumber === "" || shippingCountry === "" || shippingAddress === "" || shippingCity === [] || shippingZipCode ===""){
            setError("All field need to be fill !!!");
            console.log(error)
        }else if(shippingPrice === 0){
            setError("Choose a shipping method before processing !!!")
            console.log(error)
        } else{
            setShowShippingForm(false)
            setShowPaymentMethod(true)
            console.log(shippingOrderDetail)
        }
    }
    const handleShippingFormSummit = async () =>{
        await addOrderToDatabase(shippingOrderDetail);
        console.log("Success adding order!!!")
    }
    return (
        <Form className='shippingOrderFormContainer' >
            <Alert variant={'danger'} style={{display:showError}}>{error}</Alert>
            <Row>
                <Col sm={8}>
                    <Form.Group className="mb-3" id="FullName">
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="lg" 
                            id="fullname"
                            value={fullName}
                            placeholder="Enter your full name"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3" id="PhoneNumber">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control 
                            type="number" 
                            size="lg" 
                            id="phonenumber"
                            value={phoneNumber}
                            placeholder="Enter your phone number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" id="address">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="lg" 
                            id="address"
                            value={shippingAddress}
                            placeholder="Enter shipping address"
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" id="city">
                        <Form.Label>City:</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="lg" 
                            id="city"
                            value={shippingCity}
                            placeholder="Enter shipping address"
                            onChange={(e) => setShippingCity(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" id="country">
                        <Form.Label>Country:</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="lg" 
                            id="country"
                            value={shippingCountry}
                            placeholder="Enter shipping country"
                            onChange={(e) => setShippingCountry(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" id="zipcode">
                        <Form.Label>Zip Code:</Form.Label>
                        <Form.Control 
                            type="text" 
                            size="lg" 
                            id="zipcode"
                            value={shippingZipCode}
                            placeholder="Enter zip code"
                            onChange={(e) => setShippingZipCode(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" id="shippingMethod">
                        <Form.Label>Shipping Method:</Form.Label>
                        <Container>
                            <Form.Check
                                type="radio"
                                label="Postal - 30,000 VND"
                                name="RadioButton_ShippingMethod"
                                value={30000}
                                onChange={(e)=>{setShippingPrice(e.target.value)}}
                            />
                            <Form.Check
                                type="radio"
                                label="Priority - 50,000 VND"
                                name="RadioButton_ShippingMethod"
                                value={50000}
                                onChange={(e)=>{setShippingPrice(e.target.value)}}
                            />
                            <Form.Check
                                type="radio"
                                label="Express - 100,000 VND"
                                name="RadioButton_ShippingMethod"
                                value={100000}
                                onChange={(e)=>{setShippingPrice(e.target.value)}}
                            />
                        </Container>
                    </Form.Group>
                </Col>
            </Row>
            <Button
                style={{float:"right"}}
                onClick={()=>{
                    shippingFormInputValidation()
                }}
            >Next</Button>
        </Form>
    )
}
