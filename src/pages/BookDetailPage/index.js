import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Image, Modal, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./bookdetail.css";

import { db } from "../../firebase";
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";

export default function BookDetailPage(props) {
  const params = useParams();
  const { handleAddToCart } = props;
  const [bookId, setBookId] = useState("");
  const [bookData, setBookData] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState([]);
  const [publisher, setPublisher] = useState("");
  const [publicDate, setPublicDate] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("");
  const [language, setLanguage] = useState("");
  const [stock, setStock] = useState("");
  const [imageData, setImageData] = useState({
    name: "",
    url: "",
  });

  const fetchBookDetail = async () => {
    const bookDoc = doc(db, "books", params.id);
    const snapBookData = await getDoc(bookDoc);
    if (snapBookData.exists()) {
      setTitle(snapBookData.data().title);
      setAuthor(snapBookData.data().author);
      setGenre(snapBookData.data().genre);
      setPublisher(snapBookData.data().publisher);
      setPublicDate(snapBookData.data().publicDate);
      setPrice(snapBookData.data().price);
      setPage(snapBookData.data().page);
      setLanguage(snapBookData.data().language);
      setStock(snapBookData.data().stock);
      setDescription(snapBookData.data().description);
      setImageData(snapBookData.data().image);
      setBookId(params.id);
      setBookData(snapBookData.data());
    }
  };
  useEffect(() => {
    fetchBookDetail();
  }, [params.id]);

  const [zoomImage, setZoomImage] = useState(false);

  const [avalible, setAvalible] = useState("none");
  const [unavalible, setUnavalible] = useState("none");

  const setAvaliblityText = () => {
    if (stock === "0") {
      setAvalible("none");
      setUnavalible("block");
    } else if (stock !== "0" && stock > 0) {
      setAvalible("block");
      setUnavalible("none");
    } else {
      setAvalible("none");
      setUnavalible("none");
    }
  };

  useEffect(() => {
    setAvaliblityText();
  }, [params.id, stock]);

  const [windowSize, setWindowSize] = useState([window.innerWidth]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [showDetailImageWeb, setShowDetailImageWeb] = useState("none");
  const [showDetailImageMobie, setShowDetailImageMobie] = useState("block");

  useEffect(() => {
    if (windowSize[0] > 768) {
      setShowDetailImageWeb("block");
      setShowDetailImageMobie("none");
    } else if (windowSize[0] <= 768) {
      setShowDetailImageWeb("none");
      setShowDetailImageMobie("block");
    }
  }, [windowSize]);

  return (
    <>
      <Container className="pageWrapper">
        <Container className="sellingWrapper">
          <Container
            className="imageWrapper"
            style={{ display: showDetailImageWeb }}
          >
            <Container
              className="imageContainer"
              onClick={() => setZoomImage(true)}
            >
              <Image src={imageData.url} className="bookImage" />
            </Container>
          </Container>
          <Container className="pricingWrapper">
            <Container className="titleWrapper">
              <Container className="bookTitle">{title}</Container>
              <Container className="bookAuthor">by {author}</Container>
            </Container>

            <Container
              className="imageContainer"
              style={{ display: showDetailImageMobie }}
            >
              <Image src={imageData.url} className="bookImage" />
            </Container>

            <AvalibleStatusText />
            <UnavalibleStatusText />

            <Container className="bookPrice">
              {Number(price).toLocaleString("en-US")} VND
            </Container>

            <Container className="btnWrapper">
              <Button
                variant="primary"
                className="addCartBtn"
                onClick={() => handleAddToCart(bookId, bookData)}
                disabled={stock === "0" ? true : false}
              >
                <FontAwesomeIcon icon={faCartPlus} className="addCartIcon" />
                ADD TO CART
              </Button>
            </Container>

            <Container className="detailWrapper">
              <Container className="detailContener descriptionWrapper">
                <Container className="detailTitle descriptionTitle">
                  Description
                </Container>
                <Container className="detailContent descriptionContent">
                  {description}
                </Container>
              </Container>

              <Container className="detailContener bookDetailWrapper">
                <Container className="detailTitle">Book Detail</Container>
                <Container className="detailContent bookInfromation">
                  <Container className="detailTextLeft">
                    <Container>Price:</Container>
                    <Container>Publisher:</Container>
                    <Container>Publish&nbsp;Date:</Container>
                    <Container>Page:</Container>
                    <Container>Language:</Container>
                  </Container>
                  <Container className="detailTextRight">
                    <Container>
                      {Number(price).toLocaleString("en-US")} VND
                    </Container>
                    <Container>{publisher}</Container>
                    <Container>{publicDate}</Container>
                    <Container>{page}</Container>
                    <Container>{language}</Container>
                  </Container>
                </Container>
              </Container>

              <Container className="bookGenreWrapper">
                <Container className="detailGenreTitile">
                  Book&nbsp;Gerne:
                </Container>
                <Container className="detailGenreTag">
                  {genre.map((genreData) => {
                    return (
                      <Link
                        to={`/genres/${genreData}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Container className="detailTagContainer">
                          {genreData}
                        </Container>
                      </Link>
                    );
                  })}
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>

        <Container className="recommendBooksWrapper">
          <Container className="recommendTitleWrapper">
            <Container className="recommendTitle">
              You might have interrested in:
            </Container>
            <Container className="recommendPerson">by ZA-BookStore</Container>
          </Container>
          <Container className="recommendSlider">
            <BookRecommendSlider />
          </Container>
        </Container>
      </Container>
      <ZoomBookCover show={zoomImage} onHide={() => setZoomImage(false)} />
    </>
  );

  function ZoomBookCover(props) {
    return (
      <>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          contentClassName="imageModal"
        >
          <Modal.Body className="imageModalBody">
            <Container className="imageZoomContainer">
              <Image src={imageData.url} className="imageZoom" />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  function BookRecommendSlider() {
    const [recommendBookData, setRecommendBookData] = useState([]);
    const fetchBookData = () => {
      const q = query(collection(db, "books"));
      onSnapshot(q, (querySnapshot) => {
        setRecommendBookData(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    };
    useEffect(() => {
      fetchBookData();
    }, []);
    const settings = {
      dots: false,
      swipe: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      speed: 300,
      lazyLoad: true,
      adaptiveHeight: true,
      variableHeight: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    };
    function NextArrow(props) {
      const { className, onClick } = props;
      return (
        <img
          src={next}
          className={className + " next-arrow"}
          onClick={onClick}
          alt={"nextArrow"}
        />
      );
    }
    function PrevArrow(props) {
      const { className, onClick } = props;
      return (
        <img
          src={prev}
          className={className + " prev-arrow"}
          onClick={onClick}
          alt={"prevArrow"}
        />
      );
    }

    return (
      <>
        <Slider {...settings}>
          {recommendBookData?.map(({ id, data }) => {
            return (
              <Card key={id}>
                <Link to={`/books/${id}`}>
                  <Container className="recommendImageContainer">
                    <Card.Img variant="top" src={data.image.url} />
                  </Container>
                </Link>
                <Card.Body>
                  <Card.Title className="recommendCardTitle">
                    {data.title}
                  </Card.Title>
                  <Card.Subtitle className="recommendCardSubTitle">
                    {data.author}
                  </Card.Subtitle>
                  <Card.Text className="recommendBookPrice">
                    {Number(data.price).toLocaleString("en-US")} VND
                  </Card.Text>
                  <Card.Text style={{ display: "flex" }}>
                    Genre:
                    <Container className="recommendTagContainer">
                      {data.genre[0]}
                    </Container>
                    <Container className="recommendTagContainerEtc">
                      ...
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </Slider>
      </>
    );
  }

  function AvalibleStatusText() {
    return (
      <>
        <Container className="avalibleText" style={{ display: avalible }}>
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ marginRight: "5px" }}
          />
          Avalible
        </Container>
      </>
    );
  }
  function UnavalibleStatusText() {
    return (
      <>
        <Container className="unavalibleText" style={{ display: unavalible }}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ marginRight: "5px" }}
          />
          Not Avalible
        </Container>
      </>
    );
  }
}
