import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./searchresult.css";
import { Button, Container, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faInbox } from "@fortawesome/free-solid-svg-icons";

import { db } from "../../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import useTable from "../../components/Pagination/useTable";
import TableFooter from "../../components/Pagination/TableFooter";

function SearchResult(props) {
  const { handleAddToCart } = props;
  const params = useParams();
  const [bookData, setBookData] = useState([]);
  const [noData, setNoData] = useState(true);

  const fetchBookData = () => {
    const q = query(collection(db, "books"));
    onSnapshot(q, (querySnapshot) => {
      setBookData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  const filteredBookData = bookData?.filter(({ id, data }) => {
    return (
      { id, data }.data.title
        .toLowerCase()
        .includes(params.keyword.toLowerCase()) ||
      { id, data }.data.author
        .toLowerCase()
        .includes(params.keyword.toLowerCase()) ||
      { id, data }.data.price.toLowerCase().includes(params.keyword)
    );
  });

  useEffect(() => {
    if (collection) {
      fetchBookData();
    }
  }, [params.keyword]);
  useEffect(() => {
    if (filteredBookData.length !== 0) {
      setNoData(false);
    } else if (filteredBookData.length === 0) {
      setNoData(true);
    }
  }, [params.keyword, filteredBookData]);

  let rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(filteredBookData, page, rowsPerPage);

  return (
    <>
      <Container className="searchResultWrapper">
        <Container className="searchResultContainer">
          <Container className="searchResultTitleTextContainer">
            Search Result of: {params.keyword}
          </Container>
        </Container>
        {!noData && (
          <Container className="searchResultBookContainer">
            {slice.map((el) => {
              return (
                <Card key={el.id} style={{ marginTop: "1vh" }}>
                  <Link to={`/books/${el.id}`}>
                    <Container className="searchResultBookImageContainer">
                      <Card.Img variant="top" src={el.data.image.url} />
                    </Container>
                  </Link>
                  <Card.Body>
                    <Card.Title className="searchResultCardTitle">
                      {el.data.title}
                    </Card.Title>
                    <Card.Subtitle className="searchResultCardSubTitle">
                      {el.data.author}
                    </Card.Subtitle>
                    <Card.Text className="searchResultBookPrice">
                      {Number(el.data.price).toLocaleString("en-US")} VND
                    </Card.Text>
                    <Card.Text style={{ display: "flex" }}>
                      Genre:
                      <Container className="searchResultTagContainer">
                        {el.data.genre[0]}
                      </Container>
                      <Container className="searchResultTagContainerEtc">
                        ...
                      </Container>
                    </Card.Text>
                    <Button
                      className="searchResultAddCartBtn"
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
        )}

        {noData && (
          <Container className="noResultContainer">
            <Container className="noResultIcon">
              <FontAwesomeIcon icon={faInbox} />
            </Container>
            <Container className="noResultText">NO RESULT FOUND</Container>
          </Container>
        )}
        {filteredBookData.length > 10 && (
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

export default SearchResult;
