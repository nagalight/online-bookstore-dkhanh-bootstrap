import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container} from 'react-bootstrap'
import './allbook.css'

import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import useTable from "../../components/Pagination/useTable";
import TableFooter from "../../components/Pagination/TableFooter";

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

    let rowsPerPage = 10
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(bookData, page, rowsPerPage)

    return (
        <>
        <Container className='allBookWrapper'>
            <Container className='allBookTitile'>All Book</Container>
            <Container className='allBookContainer'>
                {slice?.map((el)=>{
                    return(
                        <Card key={el.id} style={{marginTop:"1vh"}}>
                            <Link to={`/books/${el.id}`}>
                                <Container className='allBookImageContainer'>
                                    <Card.Img variant='top' src={el.data.image.url} style={{ width: '190px' }}/>
                                </Container>
                            </Link>
                            <Card.Body>
                                <Card.Title>{el.data.title}</Card.Title>
                                <Card.Subtitle>{el.data.author}</Card.Subtitle>
                                <Card.Text className='allBookPrice'>{Number(el.data.price).toLocaleString("en-US",)} VND</Card.Text>
                                <Card.Text style={{display:'flex'}}>
                                    Genre:
                                    <Container className="allBookTagContainer">{el.data.genre[0]}</Container>
                                    <Container className="allBookTagContainer">...</Container>
                                </Card.Text>
                                <Button 
                                    className='addCardBtn' 
                                    onClick={()=>handleAddToCart(el.id, el.data)}
                                    disabled={(el.data.stock === "0") ? true : false}
                                >
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                    &nbsp;Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
            {bookData.length>10 && <TableFooter range={range} slice={slice} setPage={setPage} page={page}/>}
        </Container>
        </>
    )
}
