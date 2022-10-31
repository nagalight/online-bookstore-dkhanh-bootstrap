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

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState([]);
    const [publicDate, setPublicDate] = useState("");
    const [description, setDescription] = useState("");
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
        setDescription(snapBookData.data().description)
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
                        <Container className='detailContener descriptionWrapper'>
                            <Container className='detailTitle descriptionTitle'>Description</Container>
                            <Container className='detailContent descriptionContent'>{description}</Container>
                        </Container>
                        <Container className='detailContener bookDetailWrapper'>
                            <Container className='detailTitle'>Book Detail</Container>
                            <Container className='detailContent bookInfromation'>
                                <Container className='detailTextLeft'>
                                    <Container>Price:</Container>
                                    <Container>Publisher:</Container>
                                    <Container >Publish&nbsp;Date:</Container>
                                    <Container>Page:</Container>
                                    <Container>Language:</Container>
                                     
                                </Container>
                                <Container className='detailTextRight'>
                                    <Container>{Number(price).toLocaleString("en-US",)} VND</Container>
                                    <Container>No Data</Container>
                                    <Container>{publicDate}</Container>
                                    <Container>No Data</Container>
                                    <Container>No Data</Container>
                                </Container>
                            </Container>
                        </Container>
                        <Container className='bookGenreWrapper'>
                            <Container className='detailGenreTitile'>Book&nbsp;Gerne:</Container>
                            <Container className='detailGenreTag'>
                                {
                                    genre.map(genreData=>{
                                        return(
                                            <Container className="detailTagContainer">{genreData}</Container>
                                        )
                                    })
                                }
                            </Container>
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
        </Container>
        <Button onClick={()=>console.log(genre)}></Button>
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
                contentClassName='imageModal'
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
