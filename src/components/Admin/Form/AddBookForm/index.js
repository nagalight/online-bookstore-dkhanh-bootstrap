import React, {useState, useEffect} from 'react'
import { Container, Modal, Form, Button, Row, Col, InputGroup, } from 'react-bootstrap';

import { addBookToDatabase, bookStorage } from "../../../firebase";
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function AddBookForm(props){
    const {onHide} = props;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState([]);
    const [publisher, setPublisher] = useState("");
    const [publicDate, setPublicDate] = useState("");
    const [price, setPrice] = useState("");
    const [page, setPage] = useState("");
    const [language, setLanguage] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(
        {
            name: "",
            url: ""
        },
    );

    const handleImageChange = (e) =>{
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const summitImage = async ()=>{
        const imageRef = ref(bookStorage, `BookCover/${image.name}`);
        await uploadBytes(imageRef, image).then(()=>{
            getDownloadURL(imageRef).then((getUrl)=>{
                setImageData(
                    {
                        name: image.name,
                        url: getUrl
                    },
                );
            }).catch(error =>{
                console.log(error.message, "Error while getting the image url");
            });
        }).catch(error =>{
            console.log(error.message);
        });
    }

    const addingBook = {
        title,
        author,
        genre,
        publisher,
        publicDate,
        price,
        page,
        language,
        stock,
        image: imageData,
        description,
        addDateTime: serverTimestamp()
    }
    const handleHide=()=>{
        setTitle("")
        setAuthor("")
        setGenre([])
        setPublisher("")
        setPublicDate("")
        setPrice("")
        setPage("")
        setLanguage("")
        setStock("")
        setDescription("")
        onHide();
    }

    const handleBookSummit = async () => {
            try{
                await addBookToDatabase(addingBook);
                console.log("New book has been add successfully");
                handleHide()
            }catch(error){
                console.log(error);
            }
    }

    const inputValidation = async(e)=>{
        e.preventDefault();
        if (title === "" || author === "" || publisher === "" || publicDate === "" || genre === [] || price ==="" || page=== "" || language === "" || image == null){
            return console.log("All field need to be fill !!!");
        }else if (description === ""){
            return setDescription("There are no description");
        }else if (stock === ""){
            return setStock(0)
        }
        loopSummit()
    }

    const loopSummit = async() =>{
        if (imageData.url === ""){
            await summitImage();
        }else if (imageData.url !== ""){
            await handleBookSummit();
        }
    }

    useEffect(() => {
        loopSummit()
    }, [imageData.url])

    return(
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="formWrapper">
                    <Form className="addBookForm" onSubmit={inputValidation}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" id="Title">
                                    <Form.Label>Book title:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg" 
                                        id="title"
                                        value={title}
                                        placeholder="Enter book title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" id="Author">
                                    <Form.Label>Author:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg" 
                                        id="author" 
                                        value={author}
                                        placeholder="Enter book author"
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" id="Price">
                                    <Form.Label>Price:</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control 
                                            type="number" 
                                            size="lg" 
                                            id="price" 
                                            value={price}
                                            placeholder="Enter book price"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <InputGroup.Text>VND</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3" id="Genre">
                            <Form.Label>Genre:</Form.Label>
                            <Container className="gerneWrapper">
                                <Container className="genreColumnContainer" id="fictionWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Fiction" 
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Fiction"): setGenre(genre.filter((a) =>(a !== "Fiction")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="nonFictionWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Non-Fiction"
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Non-Fiction"): setGenre(genre.filter((a) =>(a !== "Non-Fiction")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="teenWrapper">
                                    <Form.Check 
                                    type="checkbox" 
                                    label="Teen"
                                    onChange={(e)=>{
                                        e.target.checked ? genre.push("Teen"): setGenre(genre.filter((a) =>(a !== "Teen")))
                                    }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="kidWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Kid"
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Kid"): setGenre(genre.filter((a) =>(a !== "Kid")))
                                        }} 
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="educationWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Education"
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Education"): setGenre(genre.filter((a) =>(a !== "Education")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="magazineWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Magazine"
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Magazine"): setGenre(genre.filter((a) =>(a !== "Magazine")))
                                        }}
                                    />
                                </Container>
                            </Container>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" id="Publisher">
                                    <Form.Label>Publisher:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg" 
                                        id="publisher"
                                        value={publisher}
                                        placeholder="Enter Publisher"
                                        onChange={(e) => setPublisher(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" id="PublicDate">
                                    <Form.Label>Date of Public:</Form.Label>
                                    <Form.Control 
                                        type="Date" 
                                        size="lg" 
                                        id="publicDate"
                                        value={publicDate}
                                        dateFormat="yyyy/MM/dd"
                                        placeholder="Enter Date"
                                        onChange={(e) => setPublicDate(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" id="Language">
                                    <Form.Label>Language:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        size="lg" 
                                        id="language" 
                                        value={language}
                                        placeholder="Enter book language"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" id="Page">
                                    <Form.Label>Page:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        size="lg" 
                                        id="page" 
                                        value={page}
                                        placeholder="Enter number of page"
                                        onChange={(e) => setPage(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" id="Stock">
                                    <Form.Label>Stock:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        size="lg" 
                                        id="stock" 
                                        value={stock}
                                        placeholder="Enter book in stock"
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" id="CoverImage">
                            <Form.Label>Book Cover:</Form.Label>
                            <Form.Control 
                                type="file" 
                                size="lg" 
                                id="bookCover"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" id="Description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={5}
                                size="lg"
                                value={description}
                                id="description"
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" size="lg" type="Submit">Add Book</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
