import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom"
import { Button, Col, Container, Row, Image, Card } from 'react-bootstrap'
import PaypalButton from '../../components/Payment/PaypalButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faChevronLeft, } from '@fortawesome/free-solid-svg-icons'

import { db } from '../../firebase';
import { collection, onSnapshot, query } from "firebase/firestore";

import "./payment.css"
import ShippingForm from '../../components/Payment/ShippingForm';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import next from "../../assets/next.svg"
import prev from "../../assets/prev.svg"

export default function PaymentPage(props) {
    const {cartItems, setCartItems,} = props;

    const [haveCartItem, setHaveCartItem] = useState(false);
    const [showCartList, setShowCartList] = useState(true);
    const [showShippingForm, setShowShippingForm] = useState(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [savedOrders, setSavedOrders] = useState(false);

    const [fullName, setFullName] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingZipCode, setShippingZipCode] = useState("");

    const [transactionInfo, setTransactionInfo] = useState(
        {
            transactionId:"",
            transactionTime:"",
            transactionAmount:"",
            transactionCurrency:"",
            payerId:"",
            payerEmail:"",
            transactionStatus:""
        }
    );

    const totalPrice = cartItems.reduce((price, item) =>price + item.quantity * item.data.price, 0);
    const finalPrice = parseInt(totalPrice) + parseInt(shippingPrice);
    const vndToUsdRate = 0.000043;
    const usdPrice = (finalPrice * vndToUsdRate).toFixed(2);

    const shippingOrderDetail = {
        fullName,
        phoneNumber,
        shippingAddress,
        shippingCity,
        shippingCountry,
        shippingZipCode,
        shippingPrice,
        orderTotalPrice: finalPrice,
        transactionDetail: transactionInfo,
        transactionItem: cartItems
    }
    
    const product = {
        description: "This and that(Book)",
        price: usdPrice,
    }

    const sectionStyling =  {
        cartList:{
            display: showCartList ? "block" : "none"
        },
        shippingForm:{
            display: showShippingForm ? "block" : "none"
        },
        paymentMethod:{
            display: showPaymentMethod ? "block" : "none"
        }
    }
    
    useEffect(() => {
        if (cartItems.length === 0){
            setHaveCartItem(false)
        }else if (cartItems.length > 0){
            setHaveCartItem(true)
        }else {
            console.log("Something wrong")
        }
    }, [cartItems.length])

    return(
        <>
        <Container className='paymentPageContainer'>
            <Container className='paymentContentWrapper'>
                <Row>
                    <Col sm={9}>
                        <Container className='checkOutProductContainer'>
                            <Container className='cartListWrapper'
                                style={sectionStyling.cartList}
                            >
                                <Container className='paymentPageTitle'>
                                    Order Sumary
                                </Container>
                                {haveCartItem ? 
                                <Container className='cartItemContainer'>
                                    <Container className='checkOutListNote'><FontAwesomeIcon icon={faCircleExclamation}/> Please check all the item in the cart before process to payment</Container>
                                    <Container className='cartListContainer'>
                                        {cartItems.map(({id, data, quantity})=>{
                                            return(
                                                <Container className='cartBookContainer' key={id}>
                                                <Container className='cartBookImage'>
                                                    <Image 
                                                        src={data.image.url}
                                                        style={{
                                                            width:"50px"
                                                        }}
                                                    />
                                                </Container>
                                                <Container className='cartBookName'>
                                                    <Container className='cartBookNameTitle'>{data.title}</Container>
                                                    <Container className='cartBookNameSubtitle'>By {data.author}</Container>
                                                </Container>
                                                <Container className='cartBookPrice'>{quantity}&nbsp;x&nbsp;{Number(data.price).toLocaleString("en-US",)}&nbsp;VND</Container>
                                                </Container>
                                            )
                                        })}
                                    </Container>
                                    <Container className='cartListNextButton'
                                        style={{ padding:0, display:"flex", paddingTop:"10px" }}
                                    >
                                        <Button
                                            style={{marginLeft:"auto"}}
                                            onClick={()=>{
                                                setShowCartList(false)
                                                setShowShippingForm(true)
                                            }}
                                        >Next</Button>
                                    </Container>
                                </Container>
                                : 
                                <Container className='noCartItemContainer'>
                                    <FontAwesomeIcon icon={faCircleExclamation}/>  You don't have any item in your cart
                                </Container>
                                }
                            </Container>
                            <Container className='shippingDetailContainer'
                                style={sectionStyling.shippingForm}
                            >
                                <Container className='paymentPageTitle'>
                                    <FontAwesomeIcon 
                                        icon={faChevronLeft} 
                                        onClick={()=>{
                                            setShowShippingForm(false)
                                            setShowCartList(true)
                                        }}
                                        style={{marginRight:"5px"}}
                                    />
                                    Shipping Detail
                                </Container>
                                <ShippingForm 
                                    shippingPrice={shippingPrice} 
                                    setShippingPrice={setShippingPrice}
                                    setShowShippingForm={setShowShippingForm}
                                    setShowPaymentMethod={setShowPaymentMethod}
                                    fullName={fullName}
                                    setFullName={setFullName}
                                    phoneNumber={phoneNumber}
                                    setPhoneNumber={setPhoneNumber}
                                    shippingAddress={shippingAddress}
                                    setShippingAddress={setShippingAddress}
                                    shippingCity={shippingCity}
                                    setShippingCity={setShippingCity}
                                    shippingCountry={shippingCountry}
                                    setShippingCountry={setShippingCountry}
                                    shippingZipCode={shippingZipCode}
                                    setShippingZipCode={setShippingZipCode}
                                    shippingOrderDetail={shippingOrderDetail}
                                />
                                
                            </Container>
                            <Container className='orderConfirmationContainer'
                                style={sectionStyling.paymentMethod}
                            >
                                <Container className='paymentPageTitle'>
                                    <FontAwesomeIcon 
                                        icon={faChevronLeft} 
                                        onClick={()=>{
                                            setShowPaymentMethod(false)
                                            setShowShippingForm(true)
                                        }}
                                        style={{marginRight:"5px"}}
                                    />
                                    Payment MedThod
                                </Container>
                                <Container> <FontAwesomeIcon icon={faCircleExclamation}/>  You can process to pay for the order with one of the method below</Container>
                                <Container className='paymentMethodContainer' style={{width:"35%"}}>
                                    <PaypalButton 
                                        product={product} 
                                        setTransactionInfo={setTransactionInfo} 
                                        setCartItems={setCartItems}
                                        shippingOrderDetail={shippingOrderDetail}
                                        savedOrders={savedOrders}
                                        setSavedOrders={setSavedOrders}

                                    />
                                </Container>
                            </Container>
                        </Container>
                    </Col>
                    <Col sm={3}>
                        <Container className='paymentSectionContainer'>
                            <Container className='paymentPageTitle'>
                                Your Order
                            </Container>
                            <Container className='paymentPriceContainer'>
                                <Container className='paymentPriceTitle'>
                                    Cart&nbsp;Total&nbsp;Price: <br/> Shipping&nbsp;Price:
                                </Container>
                                <Container className='paymentPriceNumber'>
                                    {Number(totalPrice).toLocaleString("en-US",)}&nbsp;VND <br/> {Number(shippingPrice).toLocaleString("en-US",)}&nbsp;VND
                                </Container>
                            </Container>
                            <Container style={{borderBottom:"2px solid black", marginTop:"10px"}}/>
                            <Container className='checkOutTotalPriceContainer'>
                                <Container className='finalPriceTitle'>Total Price:</Container>
                                <Container className='finalPriceNumber'>{Number(finalPrice).toLocaleString("en-US",)}&nbsp;VND</Container>
                            </Container>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Container className='paymentMidLine'/>

            <Container className='paymentRecommendBooksWrapper'>
                <Container className='recommendTitleWrapper'>
                    <Container className='recommendTitle'>You might have interrested in:</Container>
                    <Container className='recommendPerson'>by ZA-BookStore</Container>
                </Container>
                <Container className='recommendSlider'>
                    <BookRecommendSlider/>
                </Container>
            </Container>
        </Container>
        </>
    )

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
                <img src={next} className={className + " next-arrow"} onClick={onClick} alt={"nextArrow"} />
            );
        }
        function PrevArrow(props) {
            const { className, onClick } = props;
            return (
                <img src={prev} className={className + " prev-arrow"} onClick={onClick} alt={"prevArrow"}/>
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
                                    <Container className='recommendImageContainer'>
                                        <Card.Img variant='top' src={data.image.url} style={{ width: 'inherit' }}/>
                                    </Container>
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
