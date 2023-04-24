import React, {useState, useEffect} from 'react'
import { Container, Image, Modal, Button, Row, Col, Table } from 'react-bootstrap'

import { db } from "../../../../../firebase";
import { collection, onSnapshot, query, orderBy, where, doc } from "firebase/firestore";
import "./shippingmodal.css"

export default function ShippingModal(props) {
    const {getOrderId, openShippingInfoModal} = props

    const [buyerName, setBuyerName] = useState("");
    const [buyerPhoneNumber, setPhoneNumber] = useState("");
    const [buyerAddress, setAddress] = useState("");
    const [buyerCity, setCity] = useState("");
    const [buyerCountry, setBuyerCountry] = useState("");
    const [buyerZipCode, setBuyerZipCode] = useState("");
    const [shippingPrice, setShippingPrice] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");


    const fetchShippingData = () =>{
        if(getOrderId !== ""){
            const q = doc(db, "orders", getOrderId)
            onSnapshot(q,(querySnapshot)=>{
                setBuyerName(querySnapshot.data().fullName);
                setPhoneNumber(querySnapshot.data().phoneNumber)
                setAddress(querySnapshot.data().shippingAddress)
                setCity(querySnapshot.data().shippingCity)
                setBuyerCountry(querySnapshot.data().shippingCountry)
                setBuyerZipCode(querySnapshot.data().shippingZipCode)
                setShippingPrice(querySnapshot.data().shippingPrice)
            });
        }
    }
    useEffect(() => {
        if(collection){
            fetchShippingData();
        }
    }, [openShippingInfoModal])

    useEffect(()=>{
        if (shippingPrice === "30000"){
            setShippingMethod("Postal")
        } else if (shippingPrice === "50000"){
            setShippingMethod("Priority")
        } else if (shippingPrice === "100000"){
            setShippingMethod("Express")
        }
    },[shippingPrice])
    return(
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Body>
                <Container className='shippingInfoWrapper'>
                    <Container className='shippingInfoTitle'>Shipping info - Order {getOrderId}</Container>
                    <Container className='shippingInfoBodyWrapper'>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th>Buyer full Name</th>
                                    <th className='shippingInfoTableInfo'>{buyerName}</th>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <th className='shippingInfoTableInfo'>{buyerPhoneNumber}</th>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <th className='shippingInfoTableInfo'>{buyerAddress}</th>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <th className='shippingInfoTableInfo'>{buyerCity}</th>
                                </tr>
                                <tr>
                                    <th>Country</th>
                                    <th className='shippingInfoTableInfo'>{buyerCountry}</th>
                                </tr>
                                <tr>
                                    <th>Zip Code</th>
                                    <th className='shippingInfoTableInfo'>{buyerZipCode}</th>
                                </tr>
                                <tr>
                                    <th>Shipping Method</th>
                                    <th className='shippingInfoTableInfo'>{shippingMethod}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
