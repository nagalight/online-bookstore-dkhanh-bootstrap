import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addOrderToDatabase } from '../../../firebase';

export default function PaypalButton(props) {
    const { product, setTransactionInfo, setCartItems, shippingOrderDetail } = props

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const movePages = useNavigate()

    const handleSaveOrderDetails= async()=>{ 
        await addOrderToDatabase(shippingOrderDetail)
        setCartItems([])
    }

    const handleApprove = (orderID) =>{
        //backend function to fufill order
        // if response success
        setPaidFor(true);
        //refress user's account or subscription status
        //if respose error
    };

    useEffect(() => {
        if (paidFor){
            alert("Purchase Complete!!!");
            movePages("/")
            console.log(shippingOrderDetail)
            handleSaveOrderDetails()
        }
    }, [paidFor])

    useEffect(() => {
        if (error){
            alert(error);
        }
    }, [error])

    return (
        <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
            <PayPalButtons
                style={{
                    color: "black",
                    layout:"horizontal",
                    tagline: false,
                }}
                createOrder={(data, actions) =>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                description: product.description,
                                amount :{
                                    value: product.price
                                }
                            }
                        ]
                    })
                }}
                onApprove={async(data, actions) =>{
                    const order = await actions.order.capture();
                    console.log("order", order);
                    setTransactionInfo(
                        {
                            transactionId:order.id,
                            transactionTime:order.create_time,
                            transactionUnit:order.purchase_units,
                            payerId:order.payer.payer_id,
                            payerEmail:order.payer.email_address,
                            transactionStatus:order.status
                        }
                    );
                    handleApprove(data.orderID)
                }}
                onCancel={()=>{
                    //Display cancel message, modal
                }}
                onError={(err)=>{
                    setError(err);
                    console.error("Paypal Checkout onError", err);
                }}
            />
        </PayPalScriptProvider>
    )
}
