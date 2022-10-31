import React, {useState, useEffect} from 'react'
import { Button, Container, Image, Modal, Card } from 'react-bootstrap'
import { Link, useParams } from "react-router-dom"
import "./bookdetail.css"

import { db } from '../../firebase';
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import next from "../../assets/next.svg"
import prev from "../../assets/prev.svg"

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
    }, [params.id])

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
                <Container className='recommendSlider'>
                    <BookRecommendSlider/>
                </Container>
            </Container>
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

    function BookRecommendSlider(){
        const [recommendBookData, setRecommendBookData] = useState([]);
        const fetchBookData = () =>{
            const q = query(collection(db, "books"))
            onSnapshot(q,(querySnapshot)=>{
                setRecommendBookData(
                    querySnapshot.docs.map((doc)=>({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
        }
        useEffect(() => {
            fetchBookData()
        }, [])
        const settings={
            dots: false,
            swipe: false,
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            speed: 300,
            lazyLoad: true,
            adaptiveHeight:true,
            variableHeight:false,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        }
        function NextArrow(props) {
            const { className, onClick } = props;
            return (
                <img src={next} className={className + " next-arrow"} onClick={onClick} />
            );
        }
        function PrevArrow(props) {
            const { className, onClick } = props;
            return (
                <img src={prev} className={className + " prev-arrow"} onClick={onClick} />
            );
        }
        
        return(
            <>
            <Slider {...settings}>
                {
                    recommendBookData?.map(({ id, data }) =>{
                        return(
                            <Card key={id}>
                                <Link to={`/books/${id}`}>
                                    <Card.Img variant='top' src={data.image.url} style={{ width: '190px' }}/>
                                </Link>
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Subtitle>{data.author}</Card.Subtitle>
                                    <Card.Text className='recommendBookPrice'>{Number(data.price).toLocaleString("en-US",)} VND</Card.Text>
                                    <Card.Text style={{display:'flex'}}>
                                        Genre:
                                        <Container className="detailTagContainer">{data.genre[0]}</Container>
                                        <Container className="detailTagContainer">...</Container>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </Slider>
            </>
        )
    }
}
