import React, { useState, useEffect } from 'react'
import { Button, Container, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'

import { db } from "../../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruckFast, faList } from '@fortawesome/free-solid-svg-icons'
import ShippingModal from './ShippingModal';

export default function OrderTable() {
    const [orderData, setOrderData] = useState([]);
    const fetchOrderData = () =>{
        const q = query(collection(db, "orders"), orderBy("transactionDetail.transactionTime", "desc"))
        onSnapshot(q,(querySnapshot)=>{
            setOrderData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }
    useEffect(()=>{
        if (collection){
            fetchOrderData();
        }
    }, [])

    const [showProduct, setShowProduct] = useState(false);
    const openProductModal = () =>{
        setShowProduct(true)
    }

    const [getOrderId, setGetOrderId] = useState("");
    

    return (
        <>
        <Table responsive>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Buyer</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
                {orderData?.map(({ id, data }) =>{
                    return(
                        <tr key={id}>
                            <th>{id}</th>
                            <th>{data.fullName}</th>
                            <th>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="button-tooltip-2">Shipping Info</Tooltip>}
                                >
                                    <Button>
                                        <FontAwesomeIcon icon={faTruckFast}/>
                                    </Button>
                                </OverlayTrigger>
                                
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={<Tooltip id="button-tooltip-2">Product List</Tooltip>}
                                >
                                    <Button
                                        onClick={()=>{
                                            openProductModal()
                                            setGetOrderId(id)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faList}/>
                                    </Button>
                                    
                                </OverlayTrigger>
                            </th>
                        </tr>
                    )
                })}
            </tbody>
            <ShippingModal show={showProduct} onHide={()=>setShowProduct(false)} getOrderId={getOrderId} openProductModal={openProductModal}/>
        </Table>
        
        </>
    )
}
