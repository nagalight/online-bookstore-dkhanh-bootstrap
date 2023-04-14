import React, {useState, useEffect} from 'react'
import { Button, Container, Card } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom"
import './genrepage.css'

import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

function GenrePage(props) {
    const { handleAddToCart } = props;
    const params = useParams();
    const [bookDataFromGenre, setBookDataFromGenre] = useState([]);
    const fetchBookDataFromGenre = () =>{
        const q = query(collection(db, "books"), where("genre", "array-contains", params.genre ))
        onSnapshot(q,(querySnapshot)=>{
            setBookDataFromGenre(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data(),
                }))
            );
        });
    }
    
    useEffect(() => {
        if(collection){
            fetchBookDataFromGenre();
        }
    }, [params.genre])
    
    return (
        <>
        <Container className="genrePageWrapper">
            <Container className="genrePageContainer">
                <Container className="genrePageTitleContainer">
                    <Container className="genrePageTitleTextContainer">Genre:&nbsp;{params.genre}</Container>
                </Container>
            </Container>
            <Container className="genrePageBookContainer">
                {bookDataFromGenre?.map(({ id, data })=>{
                    return(
                        <Card key={id} style={{marginTop:"1vh"}}>
                            <Link to={`/books/${id}`}>
                                <Container className='allBookImageContainer'>
                                    <Card.Img variant='top' src={data.image.url} style={{ width: '190px' }}/>
                                </Container>
                            </Link>
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Subtitle>{data.author}</Card.Subtitle>
                                <Card.Text className='genrePageBookPrice'>{Number(data.price).toLocaleString("en-US",)} VND</Card.Text>
                                <Card.Text style={{display:'flex'}}>
                                    Genre:
                                    <Container className="genrePageTagContainer">{params.genre}</Container>
                                    <Container className="genrePageTagContainer">...</Container>
                                </Card.Text>
                                <Button 
                                    className='genrePageAddCartBtn' 
                                    onClick={()=>handleAddToCart(id, data)}
                                    disabled={(data.stock === "0") ? true : false}
                                >
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

export default GenrePage