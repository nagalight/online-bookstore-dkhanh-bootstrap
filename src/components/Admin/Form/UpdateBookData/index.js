import React, {useState, useEffect} from 'react'
import { Container, Modal, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

import { 
    db, 
    updateBookOnDatabase, 
    bookStorage
} from "../../../../firebase";
import { doc, getDoc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function UpdateBookData(props){
    const [decoyData, setDecoyData] = useState("");
    const {onHide, getBookId, setGetBookId} = props;

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
    const [imageUpdate, setImageUpdate] = useState(
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

    const [checkedFiction, setCheckedFiction] = useState(false);
    const [checkedNonFiction, setCheckedNonFiction] = useState(false);
    const [checkedTeen, setCheckedTeen] = useState(false);
    const [checkedKid, setCheckedKid] = useState(false);
    const [checkedEducation, setCheckedEducation] = useState(false);
    const [checkedMagazine, setCheckedManazine] = useState(false);

    const handleGetBookData = async() =>{
        console.log("The book currently editing: " + getBookId)
        try {
            const bookDoc = doc(db,"books", getBookId)
            const snapBookData = await getDoc(bookDoc)
            if (snapBookData.exists()) {
                console.log("Document data:", snapBookData.data());
            } else {
                console.log("No such document!");
            }
            
            setTitle(snapBookData.data().title)
            setAuthor(snapBookData.data().author)
            setGenre(snapBookData.data().genre)
            setPublisher(snapBookData.data().publisher)
            setPublicDate(snapBookData.data().publicDate)
            setPrice(snapBookData.data().price)
            setPage(snapBookData.data().page)
            setLanguage(snapBookData.data().language)
            setStock(snapBookData.data().stock)
            setDescription(snapBookData.data().description)
            setImageData(snapBookData.data().image)

            setDecoyData(snapBookData.data().title)
        } catch (error) {
            console.log (error)
        }
    }

    const handleGetGenreChecked=()=>{
        setCheckedFiction(genre.includes("Fiction"));
        setCheckedNonFiction(genre.includes("Non-Fiction"));
        setCheckedTeen(genre.includes("Teen"));
        setCheckedKid(genre.includes("Kid"));
        setCheckedEducation(genre.includes("Education"));
        setCheckedManazine(genre.includes("Magazine"));
    }

    const updateBookWithoutImageChange = {
        title: title,
        author: author,
        genre: genre,
        publisher: publisher,
        publicDate: publicDate,
        price: price,
        page: page,
        language: language,
        stock: stock,
        description: description,
        image: imageData
    }
    const updateBookWithImageChange = {
        title: title,
        author: author,
        genre: genre,
        publisher: publisher,
        publicDate: publicDate,
        price: price,
        page: page,
        language: language,
        stock: stock,
        description: description,
        image: imageUpdate
    }

    const summitImage = async ()=>{
        const imageRef = await ref(bookStorage, `BookCover/${image.name}`);
        await uploadBytes(imageRef, image).then(()=>{
            getDownloadURL(imageRef).then((getUrl)=>{
                setImageUpdate(
                    {
                        name: image.name,
                        url: getUrl
                    },
                ); 
                console.log(imageData); 
            }).catch(error =>{
                console.log(error.message, "Error while getting the image url");
            });
        }).catch(error =>{
            console.log(error.message);
        });
    }
    const handleBookUpdate = async() => {
        try{
            if (image === null){
                await updateBookOnDatabase(getBookId, updateBookWithoutImageChange);
                console.log(`Book with the id of ${getBookId} has been update successfully`);
            }else if (image !== null){
                await updateBookOnDatabase(getBookId, updateBookWithImageChange);
                console.log(`Book with the id of ${getBookId} has been update successfully`);
            }
            onHide();
        }catch(error){
            console.log(error);
        }
}

    const updateValidation = async(e)=>{
        e.preventDefault();
        if (title === "" || author === "" || publisher === "" || publicDate === "" || genre === [] || price ==="" || page=== "" || language === ""){
            return console.log("All field need to be fill !!!");
        }else if (stock === ""){
            return setStock(0)
        }
        loopSummit()
    }

    const loopSummit = async() =>{
        if (image === null){
            await handleBookUpdate();
        }else if (image !==null){
            if (imageUpdate.url === ""){
                await summitImage();
            }else if (imageUpdate.url !== ""){
                await handleBookUpdate();
            }
        }
    }

    useEffect(() => {
        updateValidation()
    }, [imageUpdate])

    useEffect(() => {
      if (getBookId !== "" && getBookId !== undefined){
        handleGetBookData()
      }
      handleGetGenreChecked()
    }, [getBookId, decoyData])

    const handleCloseModal = () =>{
        onHide();
        setGetBookId("")
    }
    
    return(
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Book Data
                </Modal.Title>
                <Button variant="light" onClick={handleCloseModal}>
                    <FontAwesomeIcon icon={faXmark}/>
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Container className="formWrapper">
                    <Form className="addBookForm" onSubmit={updateValidation}>
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
                                        checked={checkedFiction} 
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Fiction"): setGenre(genre.filter((a) =>(a !== "Fiction")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="nonFictionWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Non-Fiction"
                                        checked={checkedNonFiction}
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Non-Fiction"): setGenre(genre.filter((a) =>(a !== "Non-Fiction")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="teenWrapper">
                                    <Form.Check 
                                    type="checkbox" 
                                    label="Teen"
                                    checked={checkedTeen}
                                    onChange={(e)=>{
                                        e.target.checked ? genre.push("Teen"): setGenre(genre.filter((a) =>(a !== "Teen")))
                                    }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="kidWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Kid"
                                        checked={checkedKid}
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Kid"): setGenre(genre.filter((a) =>(a !== "Kid")))
                                        }} 
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="educationWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Education"
                                        checked={checkedEducation}
                                        onChange={(e)=>{
                                            e.target.checked ? genre.push("Education"): setGenre(genre.filter((a) =>(a !== "Education")))
                                        }}
                                    />
                                </Container>
                                <Container className="genreColumnContainer" id="magazineWrapper">
                                    <Form.Check 
                                        type="checkbox" 
                                        label="Magazine"
                                        checked={checkedMagazine}
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
                            <Container>(The curent image being save is: {imageData.name})</Container>
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

                        <Button variant="primary" size="lg" type="Submit">Update data</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
