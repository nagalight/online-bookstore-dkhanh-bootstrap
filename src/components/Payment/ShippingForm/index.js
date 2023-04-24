import React, { useState, useEffect } from 'react'
import { Alert, Button, Container, Col, Form, Row } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

import { addOrderToDatabase } from "../../../firebase";
import "./shippingform.css"

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
    useEffect(() => {
        console.log(phoneNumber)
    }, [phoneNumber])

    const [isPhoneInputFocused, setPhoneInputFocused] = useState(false)
    
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
                            onFocus={() => setPhoneInputFocused(false)}
                            placeholder="Enter your full name"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3" id="PhoneNumber">
                        <Form.Label>Phone Number:</Form.Label><br/>
                        <NumericFormat
                        className='phoneNumberInputField'
                        type='tel'
                        value={phoneNumber}
                        id="phonenumber"
                        allowLeadingZeros = "true"
                        isnumericstring = "true"
                        allowEmptyFormatting = "false"
                        placeholder='Enter your phone number'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onFocus={() => setPhoneInputFocused(true)}
                        style={{
                            borderColor: isPhoneInputFocused === true ? '#86b7fe' : '#ced4da',
                            boxShadow: isPhoneInputFocused === true ? '0 0 0 0.25rem rgba(13,110,253,0.25)': 'none',
                            outline: 'none'
                        }}
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
                            onFocus={() => setPhoneInputFocused(false)}
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
                            onFocus={() => setPhoneInputFocused(false)}
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
                            onFocus={() => setPhoneInputFocused(false)}
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
                            onFocus={() => setPhoneInputFocused(false)}
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
                                onFocus={() => setPhoneInputFocused(false)}
                                onChange={(e)=>{setShippingPrice(e.target.value)}}
                            />
                            <Form.Check
                                type="radio"
                                label="Priority - 50,000 VND"
                                name="RadioButton_ShippingMethod"
                                value={50000}
                                onFocus={() => setPhoneInputFocused(false)}
                                onChange={(e)=>{setShippingPrice(e.target.value)}}
                            />
                            <Form.Check
                                type="radio"
                                label="Express - 100,000 VND"
                                name="RadioButton_ShippingMethod"
                                value={100000}
                                onFocus={() => setPhoneInputFocused(false)}
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
