import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container} from 'react-bootstrap'
import './allbook.css'

import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function AllBook(props) {
    const { handleAddToCart } = props;
    const [bookData, setBookData] = useState([]);
    const fetchBookData = () =>{
        const q = query(collection(db, "books"))
        onSnapshot(q,(querySnapshot)=>{
            setBookData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }
    useEffect(()=>{
        if (collection){
            fetchBookData();
        }
    }, [])
    return (
        <>
        <Container className='allBookWrapper'>
            <Container className='allBookTitile'>All Book</Container>
            <Container className='allBookContainer'>
                {bookData?.map(({ id, data })=>{
                    return(
                        <Card key={id} style={{marginTop:"1vh"}}>
                            <Link to={`/books/${id}`}>
                                <Card.Img variant='top' src={data.image.url} style={{ width: '190px' }}/>
                            </Link>
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Subtitle>{data.author}</Card.Subtitle>
                                <Card.Text className='allBookPrice'>{Number(data.price).toLocaleString("en-US",)} VND</Card.Text>
                                <Card.Text style={{display:'flex'}}>
                                    Genre:
                                    <Container className="allBookTagContainer">{data.genre[0]}</Container>
                                    <Container className="allBookTagContainer">...</Container>
                                </Card.Text>
                                <Button className='addCardBtn' onClick={()=>handleAddToCart({id, data})}>
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                    &nbsp;Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        </Container>
        </>
    )
}
