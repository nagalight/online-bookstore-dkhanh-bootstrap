import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import './searchresult.css'
import { Button, Container, Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faInbox } from '@fortawesome/free-solid-svg-icons'

import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

function SearchResult(props) {
    const { handleAddToCart } = props;
    const params = useParams();
    const [bookData, setBookData] = useState([]);
    const [noData, setNoData] = useState(true);

    const fetchBookData = () =>{
        const q = query(collection(db, "books"), where('title', '==', params.keyword))
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
    }, [params.keyword])
    useEffect(()=>{
        if (bookData.length !== 0){
            setNoData(false)
        }else if (bookData.length === 0){
            setNoData(true)
        }
    },[params.keyword,bookData])
    return (
        <>
        <Container className="searchResultWrapper">
            <Container className="searchResultContainer">
                <Container className="searchResultTitleContainer">
                    <Container className="searchResultTitleTextContainer">Search Result of: {params.keyword}</Container>
                </Container>
            </Container>
            {!noData &&<Container className="searchResultBookContainer">
                    {bookData?.map(({ id, data })=>{
                        return(
                            <Card key={id} style={{marginTop:"1vh"}}>
                                <Link to={`/books/${id}`}>
                                    <Card.Img variant='top' src={data.image.url} style={{ width: '190px' }}/>
                                </Link>
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Subtitle>{data.author}</Card.Subtitle>
                                    <Card.Text className='searchResultBookPrice'>{Number(data.price).toLocaleString("en-US",)} VND</Card.Text>
                                    <Card.Text style={{display:'flex'}}>
                                        Genre:
                                        <Container className="searchResultTagContainer">{data.genre[0]}</Container>
                                        <Container className="searchResultTagContainer">...</Container>
                                    </Card.Text>
                                    <Button className='searchResultAddCartBtn' onClick={()=>handleAddToCart({id, data})}>
                                        <FontAwesomeIcon icon={faCartPlus}/>
                                        &nbsp;Add to Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Container>
                }
                {noData&&<Container className="noResultContainer">
                        <Container className='noResultIcon'>
                            <FontAwesomeIcon icon={faInbox}/>
                        </Container>
                        <Container className='noResultText'>NO RESULT FOUND</Container>
                        <Container>
                            <Button onClick={()=>console.log(bookData)}/>
                        </Container>
                    </Container>
                }
            
            
        </Container>
        </>
    )
}

export default SearchResult