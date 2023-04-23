import React, {useState, useEffect} from 'react'
import { Container, Image, Modal, Button } from 'react-bootstrap'

import { db } from "../../../../../firebase";
import { collection, onSnapshot, query, orderBy, where, doc } from "firebase/firestore";
import "./shippingmodal.css"

export default function ShippingModal(props) {
    const {getOrderId, openProductModal} = props
    const [shippingItems, setShippingItems] = useState([]);

    const fetchBookDataInOrder = () =>{
        if(getOrderId !== ""){
            const q = doc(db, "orders", getOrderId)
            onSnapshot(q,(querySnapshot)=>{
                setShippingItems(
                    querySnapshot.data().transactionItem
                );
            });
        }
        
    }
    useEffect(() => {
        if(collection){
            fetchBookDataInOrder();
        }
    }, [openProductModal])

    return (
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static">
            <Modal.Header closeButton/>
            <Modal.Body>
                <Container className='shippingBookWrapper'>
                    {shippingItems.map(({id, data, quantity})=>{
                    return(
                        <Container className='shippingBookContainer' key={id}>
                        <Container className='shippingBookImage'>
                            <Image 
                            src={data.image.url}
                            style={{
                                width:"50px"
                            }}
                            />
                        </Container>
                        <Container className='shippingBookName'>
                            <Container className='shippingBookNameTitle'>{data.title}</Container>
                            <Container className='shippingBookNameSubtitle'>By {data.author}</Container>
                        </Container>
                        <Container className='shippingBookPrice'>{quantity}&nbsp;x&nbsp;{Number(data.price).toLocaleString("en-US",)}&nbsp;VND</Container>
                        </Container>
                    )
                    })}
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
