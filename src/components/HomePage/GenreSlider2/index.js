import React, {useState, useEffect} from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import '../homebookslider.css'

import { db } from '../../../firebase';
import { limit, collection, onSnapshot, query, where } from 'firebase/firestore';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import next from "../../../assets/next.svg"
import prev from "../../../assets/prev.svg"

function GenreSlider2() {
    const [genreBookData, setGenreBookData] = useState([]);
    const fetchBookData = () =>{
        const q = query(collection(db, "books"), where("genre","array-contains","Non-Fiction"), limit(7))
        onSnapshot(q,(querySnapshot)=>{
            setGenreBookData(
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

    function NextArrow(props) {
        const { className, onClick } = props;
        return (
            <img src={next} className={className + " next-arrow"} onClick={onClick} alt={"nextArrow"} />
        );
    }

    function PrevArrow(props) {
        const { className, onClick } = props;
        return (
            <img src={prev} className={className + " prev-arrow"} onClick={onClick} alt={"prevArrow"}/>
        );
    }

    const settings={
        dots: false,
        swipe: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 300,
        lazyLoad: true,
        adaptiveHeight:true,
        variableHeight:false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    return (
        <Container className='homeBookSliderWrapper'>
            <Container className='homeBookSliderTitleWrapper'>
                <Container className='homeBookSliderTitleContainer'>I heard that you like physic, we have Non-Fiction:</Container>
                <Container className='homeBookSliderViewAllContainer'>
                    <Container 
                        style={{
                            width:'fit-content',
                            height:'fit-content',
                            padding:0,
                        }}
                    />
                    <Link to={'/genres/Non-Fiction'}>
                        <Container 
                            style={{
                                width:'fit-content',
                                height:'fit-content',
                                padding:0,
                                fontSize:'16px'
                            }}
                        >
                            See&nbsp;More
                        </Container>
                    </Link>
                    
                </Container>
            </Container>
            <Container className='homeBookSliderContainer'>
                <Slider {...settings}>
                    {
                        genreBookData?.map(({ id, data }) =>{
                            return(
                                <Card key={id} >
                                    <Link to={`/books/${id}`}>
                                        <Container className='homeBookImageContainer'>
                                            <Card.Img variant='top' src={data.image.url} style={{ width: '205px' }}/>
                                        </Container>
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{data.title}</Card.Title>
                                        <Card.Subtitle>{data.author}</Card.Subtitle>
                                        <Card.Text className='homeBookPrice'>{Number(data.price).toLocaleString("en-US",)} VND</Card.Text>
                                        <Card.Text style={{display:'flex'}}>
                                            Genre:
                                            <Container className="homeTagContainer">{data.genre[0]}</Container>
                                            <Container className="homeTagContainer">...</Container>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Slider>
            </Container>
        </Container>
        
    )
}

export default GenreSlider2