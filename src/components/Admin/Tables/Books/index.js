import React, {useEffect, useState} from "react";
import { Container, Table, Button, Image, OverlayTrigger, Tooltip, Pagination } from "react-bootstrap";

import { db, deleteBookOnDatabase } from "../../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom"

import UpdateBookData from "../../Form/UpdateBookData";
import ConfirmRemoveBookWindow from "../../Confirmation/Book";

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
                    bookData?.map(({ id, data }) =>{
                        return(
                            <tr key={id}>
                                <th style={{width:'100px'}}>
                                    <Image src={data.image.url} className="bookCoverImage" />
                                </th>
                                <th>{data.title}</th>
                                <th>{data.author}</th>
                                <th className="genreTagContainer">
                                    {
                                        data.genre.map(genreData =>{
                                            return(
                                                <Container className="tagContainer">{genreData}</Container>
                                            )
                                        })
                                    }
                                </th>
                                <th>{data.publisher}</th>
                                <th>{data.publicDate}</th>
                                <th>{Number(data.price).toLocaleString("en-US",)} VND</th>
                                <th>{data.stock}</th>
                                <th style={{width:'130px'}}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Go to this book product site</Tooltip>}
                                    >
                                        <Link to={`/books/${id}`}>
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
                                                setGetBookId(id);
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
                                                setGetBookId(id);
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
        <ConfirmRemoveBookWindow show={showConfirmDeleteBook} onHide={handleHideConfirmDeleteBook} showConfirmDeleteBook={showConfirmDeleteBook} getBookId={getBookId} setGetBookId={setGetBookId} handleHideConfirmDeleteBook={handleHideConfirmDeleteBook}/>
        <UpdateBookData show={showUpdateBookForm} onHide={handleHideUpdateBookForm} getBookId={getBookId} setGetBookId={setGetBookId}/>
        </>
    )
}