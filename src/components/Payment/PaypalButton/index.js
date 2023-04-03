import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useState, useEffect } from 'react'

export default function PaypalButton(props) {
    const { product } = props

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderID) =>{
        //backend function to fufill order

        // if response success
        setPaidFor(true);
        //refress user's account or subscription status

        //if respose error
    };

    if (paidFor){
        alert("Purchase Complete!!!");
    }

    if (error){
        alert(error);
    }

    return (
        <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
            <PayPalButtons
                style={{
                    color: "black",
                    layout:"horizontal",
                    tagline: false,
                }}
                // onClick={(data, actions)=>{
                //     const accessPermission = false;

                //     if (accessPermission){
                //         setError("Checkout Fail!!!");
                //         return actions.reject()
                //     }else{
                //         return actions.resolve();
                //     }
                // }}
                createOrder={(data, actions) =>{
                    return actions.order.create({
                        purchase_units:[
                            {
                                description: product.description,
                                amount :{
                                    value:product.price
                                }
                            }
                        ]
                    })
                }}
                onApprove={async(data, actions) =>{
                    const order = await actions.order.capture();
                    console.log("order", order);
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
