import React, {useState, useEffect} from 'react'
import { Container, Image, Modal } from 'react-bootstrap'

import { db } from "../../../../../firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import "./productmodal.css"

export default function ProductModal(props) {
    const {getOrderId, openProductModal} = props
    const [orderItems, setOrderItems] = useState([]);

    const fetchBookDataInOrder = () =>{
        if(getOrderId !== ""){
            const q = doc(db, "orders", getOrderId)
            onSnapshot(q,(querySnapshot)=>{
                setOrderItems(
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
        centered>
            <Modal.Body>
                <Container className='orderBookWrapper'>
                    {orderItems.map(({id, data, quantity})=>{
                    return(
                        <Container className='orderBookContainer' key={id}>
                        <Container className='orderBookImage'>
                            <Image 
                            src={data.image.url}
                            style={{
                                width:"50px"
                            }}
                            />
                        </Container>
                        <Container className='orderBookName'>
                            <Container className='orderBookNameTitle'>{data.title}</Container>
                            <Container className='orderBookNameSubtitle'>By {data.author}</Container>
                        </Container>
                        <Container className='orderBookPrice'>{quantity}&nbsp;x&nbsp;{Number(data.price).toLocaleString("en-US",)}&nbsp;VND</Container>
                        </Container>
                    )
                    })}
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
