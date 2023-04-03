import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import PaypalButton from '../../components/Payment/PaypalButton'

import "./payment.css"
import { PayPalButtons } from '@paypal/react-paypal-js'

export default function PaymentPage(props) {
    const {cartItems} = props;
    const totalPrice = cartItems.reduce((price, item) =>price + item.quantity * item.data.price, 0)
    const product = {
        description: "This and that(Book)",
        price: 20,
    }
    return(
        <>
        <Container className='paymentPageContainer'>
            <Container className='paymentTitle'>
                Payment Method
            </Container>
            <Container className='paymentContentWrapper'>
                <Container className='paymentMedthodContainer'>
                    Total Price: {Number(totalPrice).toLocaleString("en-US",)}&nbsp;VND
                    <PaypalButton product={product}/>
                    {/* <PayPalButtons/> */}
                </Container>
            </Container>
        </Container>
        </>
    )
}
