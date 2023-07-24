import React, { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./genrepage.css";

import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import useTable from "../../components/Pagination/useTable";
import TableFooter from "../../components/Pagination/TableFooter";

function GenrePage(props) {
  const { handleAddToCart } = props;
  const params = useParams();
  const [bookDataFromGenre, setBookDataFromGenre] = useState([]);
  const fetchBookDataFromGenre = () => {
    const q = query(
      collection(db, "books"),
      where("genre", "array-contains", params.genre)
    );
    onSnapshot(q, (querySnapshot) => {
      setBookDataFromGenre(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    if (collection) {
      fetchBookDataFromGenre();
    }
  }, [params.genre]);

  let rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(bookDataFromGenre, page, rowsPerPage);

  return (
    <>
      <Container className="genrePageWrapper">
        <Container className="genrePageContainer">
          <Container className="genrePageTitleContainer">
            Genre:&nbsp;{params.genre}
          </Container>
        </Container>
        <Container className="genrePageBookContainer">
          {slice?.map((el) => {
            return (
              <Card key={el.id} style={{ marginTop: "1vh" }}>
                <Link to={`/books/${el.id}`}>
                  <Container className="allBookImageContainer">
                    <Card.Img variant="top" src={el.data.image.url} />
                  </Container>
                </Link>
                <Card.Body>
                  <Card.Title className="genrePageCardTitle">
                    {el.data.title}
                  </Card.Title>
                  <Card.Subtitle className="genrePageCardSubTitle">
                    {el.data.author}
                  </Card.Subtitle>
                  <Card.Text className="genrePageBookPrice">
                    {Number(el.data.price).toLocaleString("en-US")} VND
                  </Card.Text>
                  <Card.Text style={{ display: "flex" }}>
                    Genre:
                    <Container className="genrePageTagContainer">
                      {params.genre}
                    </Container>
                    <Container className="genrePageTagContainerEtc">
                      ...
                    </Container>
                  </Card.Text>
                  <Button
                    className="genrePageAddCartBtn"
                    onClick={() => handleAddToCart(el.id, el.data)}
                    disabled={el.data.stock === "0" ? true : false}
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                    &nbsp;Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
        {bookDataFromGenre.length > 10 && (
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        )}
      </Container>
    </>
  );
}

export default GenrePage;
