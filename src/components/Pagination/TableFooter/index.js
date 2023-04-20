import React, { useEffect } from "react";
import "./tablefooter.css"

import { Container } from "react-bootstrap";

const TableFooter = (props) => {
    const { range, setPage, page, slice } = props;
    useEffect(() => {
      if (slice.length < 1 && page !== 1) {
        setPage(page - 1);
      }
    }, [slice, page, setPage]);
    return (
      <Container className="tableFooter">
        {range.map((el, index) => (
          <button
            key={index}
            className={`${"footerButton"} ${
              page === el ? "activeButton" : "inactiveButton"
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      </Container>
    );
  };
  
  export default TableFooter;