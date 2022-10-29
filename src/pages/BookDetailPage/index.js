import React, {useState, useEffect} from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from "react-router-dom"

import { db } from '../../firebase';
import { doc, getDoc} from "firebase/firestore";

export default function BookDetailPage() {
    const params = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const fetchBookDetail = async () =>{
        const bookDoc = doc(db,"books", params.id)
        const snapBookData = await getDoc(bookDoc)
        if (snapBookData.exists()) {
            console.log("Document data:", snapBookData.data());
        } else {
            console.log("No such document!");
        }
        setBookDetail(snapBookData.data())
    }
    useEffect(() => {
        fetchBookDetail()
    }, [])
    
    return (
        <>
        <Container className='pageWrapper'>
            <Container className='sellingWrapper'>
                <Container className='imageWrapper'>
                    <Container className='imageContainer'></Container>
                </Container>
                <Container className='pricingWrapper'></Container>
            </Container>
        </Container>
        </>
    )
}
