import React, {useState, useEffect} from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { db, deleteBookOnDatabase } from "../../../../firebase";
import { doc, getDoc} from "firebase/firestore";

export default function ConfirmRemoveBookWindow(props) {
    const { getBookId, setGetBookId, handleHideConfirmDeleteBook, showConfirmDeleteBook } = props;
    const [title, setTitle] = useState("");

    const handleGetBookTitle = async() =>{
        try {
            const bookDoc = doc(db,"books", getBookId)
            const snapBookData = await getDoc(bookDoc)
            if (snapBookData.exists()) {
                console.log("Document data:", snapBookData.data());
            } else {
                console.log("No such document!");
            }
            
            setTitle(snapBookData.data().title)
        } catch (error) {
            console.log (error)
        }
    }

    const executeYes = () =>{
        deleteBookOnDatabase(getBookId)
    }
    const executeNo = () =>{
        setGetBookId("");
        setTitle("");
    }
    const testId = () =>{
        console.log(title)
        console.log (getBookId)
    }

    useEffect(() => {
        if(showConfirmDeleteBook){
            handleGetBookTitle()
            testId()
        }
    }, [getBookId])
    
    return (
    <>
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="confirmBookModal"
    >
        <Modal.Header>
            <Modal.Body>Do you sure you want to remove "{title}" book data from the database?</Modal.Body>
            <Modal.Footer>
                <Container>
                    <Button
                        onClick={(e)=>{
                            executeYes()
                            handleHideConfirmDeleteBook()
                        }}
                    >Yes</Button>
                </Container>
                <Container>
                    <Button
                        onClick={(e)=>{
                            executeNo()
                            handleHideConfirmDeleteBook()
                        }}
                    >No</Button>
                </Container>
            </Modal.Footer>
        </Modal.Header>
    </Modal>
    </>
    )
}
