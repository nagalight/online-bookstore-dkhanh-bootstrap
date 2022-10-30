import React, {useState, useEffect} from 'react'
import { Button, Container, Image, Modal } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import "./bookdetail.css"

import { db } from '../../firebase';
import { doc, getDoc} from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function BookDetailPage() {
    const params = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState([]);
    const [publicDate, setPublicDate] = useState("");
    const [price, setPrice] = useState("");
    const [imageData, setImageData] = useState(
        {
            name: "",
            url: ""
        },
    );

    const fetchBookDetail = async () =>{
        const bookDoc = doc(db,"books", params.id)
        const snapBookData = await getDoc(bookDoc)
        if (snapBookData.exists()) {
            console.log("Document data:", snapBookData.data());
        } else {
            console.log("No such document!");
        }
        setTitle(snapBookData.data().title)
        setAuthor(snapBookData.data().author)
        setGenre(snapBookData.data().genre)
        setPublicDate(snapBookData.data().publicDate)
        setPrice(snapBookData.data().price)
        setImageData(snapBookData.data().image)
    }
    useEffect(() => {
        fetchBookDetail()
    }, [])

    const [zoomImage, setZoomImage] = useState(false);
    
    return (
        <>
        <Container className='pageWrapper'>
            <Container className='sellingWrapper'>
                <Container className='imageWrapper'>
                    <Container className='imageContainer justify-content-end' onClick={()=>setZoomImage(true)}>
                        <Image src={imageData.url} className='bookImage'/>
                    </Container>
                </Container>
                <Container className='pricingWrapper'>
                    <Container className='titleWrapper'>
                        <Container className='bookTitle'>{title}</Container>
                        <Container className='bookAuthor'>by {author}</Container>
                    </Container>
                    <Container className='bookPrice'>{Number(price).toLocaleString("en-US",)} VND</Container>
                    <Container className='btnWrapper'>
                        <Button variant='primary' className='addCartBtn'>
                            <FontAwesomeIcon icon={faCartPlus} className='addCartIcon'/>
                            ADD TO CART
                        </Button>
                    </Container>
                    <Container className='detailWrapper'>
                        <Container className='descriptionWrapper'></Container>
                        <Container className='bookDetailWrapper'></Container>
                        <Container className='bookGenreWrapper'></Container>
                    </Container>
                </Container>
            </Container>
        </Container>
        <Container className='recommendBooksWrapper'>
            <Container className='recommendTitleWrapper'>
                <Container className='recommendTitle'>You might have interrested in:</Container>
                <Container className='recommendPerson'>by ZA-BookStore</Container>
            </Container>
            
            Bookslider Running here
        </Container>
        <ZoomBookCover show={zoomImage} onHide={()=>setZoomImage(false)}/>
        </>
    )

    function ZoomBookCover(props){
        return(
            <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='imageModalBody'>
                    <Container className='imageZoomContainer'>
                        <Image src={imageData.url} className='imageZoom'/>
                    </Container>
                    
                </Modal.Body>
            </Modal>
            </>
        )
    }
}
