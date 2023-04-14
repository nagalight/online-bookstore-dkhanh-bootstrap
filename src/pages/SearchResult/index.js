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

    const filteredBookData = bookData?.filter(({id,data})=>{
        return {id, data}.data.title.toLowerCase().includes(params.keyword.toLowerCase()) || 
        {id, data}.data.author.toLowerCase().includes(params.keyword.toLowerCase()) ||
        {id, data}.data.price.toLowerCase().includes(params.keyword)
    })

    useEffect(()=>{
        if (collection){
            fetchBookData();
        }
    }, [params.keyword])
    useEffect(()=>{
        if (filteredBookData.length !== 0){
            setNoData(false)
        }else if (filteredBookData.length === 0){
            setNoData(true)
        }
    },[params.keyword,filteredBookData])
    return (
        <>
        <Container className="searchResultWrapper">
            <Container className="searchResultContainer">
                <Container className="searchResultTitleTextContainer">Search Result of: {params.keyword}</Container>
            </Container>
            {!noData &&<Container className="searchResultBookContainer">
                {filteredBookData.map(({ id, data })=>{
                    return(
                        <Card key={id} style={{marginTop:"1vh"}}>
                            <Link to={`/books/${id}`}>
                                <Container className='searchResultBookImageContainer'>
                                    <Card.Img variant='top' src={data.image.url} style={{ width: '190px' }}/>
                                </Container>
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
            </Container>}
                
            {noData &&<Container className="noResultContainer">
                <Container className='noResultIcon'>
                    <FontAwesomeIcon icon={faInbox}/>
                </Container>
                <Container className='noResultText'>NO RESULT FOUND</Container>
            </Container>}
                
        </Container>
        </>
    )
}

export default SearchResult