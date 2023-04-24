import React, {useEffect, useState} from "react";
import { Container, Table, Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

import { db } from "../../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom"

import UpdateBookData from "../../Form/UpdateBookData";
import ConfirmRemoveBookWindow from "../../Confirmation/Book";
import useTable from "../../../Pagination/useTable";
import TableFooter from "../../../Pagination/TableFooter";


export default function BookTable(props){
    const [bookData, setBookData] = useState([]);
    const fetchBookData = () =>{
        const q = query(collection(db, "books"), orderBy("addDateTime", "desc"))
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
    
    let rowsPerPage = 5
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(bookData, page, rowsPerPage)



    const [showUpdateBookForm, setShowUpdateBookForm] = useState(false);
    const handleShowUpdateBookForm = () => setShowUpdateBookForm(true);
    const handleHideUpdateBookForm = () => {
        setShowUpdateBookForm(false);
        setGetBookId("");
    }

    const [showConfirmDeleteBook, setShowConfirmDeleteBook] = useState(false);
    const handleShowConfirmDeleteBook = () => setShowConfirmDeleteBook(true);
    const handleHideConfirmDeleteBook = () => {
        setShowConfirmDeleteBook(false);
        setGetBookId("");
    }
    
    const [getBookId, setGetBookId] = useState("");
    
    return(
        <>
        <Table responsive>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Book title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Publisher</th>
                    <th>Day of public</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    // bookData?.map(({ id, data }) =>{
                    slice?.map((el) =>{
                        return(
                            <tr key={el.id}>
                                <th style={{width:'100px'}}>
                                    <Image src={el.data.image.url} className="bookCoverImage" />
                                </th>
                                <th>{el.data.title}</th>
                                <th>{el.data.author}</th>
                                <th className="genreTagContainer">
                                    {
                                        el.data.genre.map(genreData =>{
                                            return(
                                                <Container className="tagContainer">{genreData}</Container>
                                            )
                                        })
                                    }
                                </th>
                                <th>{el.data.publisher}</th>
                                <th>{el.data.publicDate}</th>
                                <th>{Number(el.data.price).toLocaleString("en-US",)} VND</th>
                                <th>{el.data.stock}</th>
                                <th style={{width:'130px'}}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Go to this book product site</Tooltip>}
                                    >
                                        <Link to={`/books/${el.id}`}>
                                            <Button
                                                className="btnAction"
                                                variant="primary"
                                            >
                                                <FontAwesomeIcon icon={faInfo}/>
                                            </Button>
                                        </Link>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Edit this book information</Tooltip>}
                                    >
                                        <Button
                                            className="btnAction"
                                            variant="secondary"
                                            onClick={(e) => {
                                                setGetBookId(el.id);
                                                handleShowUpdateBookForm();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare}/>
                                        </Button>
                                    </OverlayTrigger>
                                    
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Delete this book</Tooltip>}
                                    >
                                        <Button
                                            className="btnAction"
                                            variant="danger"
                                            onClick={() => {
                                                setGetBookId(el.id);
                                                handleShowConfirmDeleteBook();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </OverlayTrigger>
                                </th>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        {bookData.length > 5 && <TableFooter range={range} slice={slice} setPage={setPage} page={page}/>}
        
        
        <ConfirmRemoveBookWindow show={showConfirmDeleteBook} onHide={handleHideConfirmDeleteBook} showConfirmDeleteBook={showConfirmDeleteBook} getBookId={getBookId} setGetBookId={setGetBookId} handleHideConfirmDeleteBook={handleHideConfirmDeleteBook}/>
        <UpdateBookData show={showUpdateBookForm} onHide={handleHideUpdateBookForm} getBookId={getBookId} setGetBookId={setGetBookId}/>
        </>
    )
}