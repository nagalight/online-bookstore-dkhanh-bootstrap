import React, {useState, useEffect} from 'react'
import { Button, Container, Modal } from 'react-bootstrap'

import { db } from "../../../../firebase";
import { collection, onSnapshot, where, query, doc, getDoc, deleteDoc } from "firebase/firestore";

export default function ConfirmRemoveAccountWindow(props) {
    const { getAccountId, setGetAccountId, showConfirmRemoveAccount, handleHideConfirmRemoveAccount } = props;
    const [accountName, setAccountName] = useState("");
    
    const getAccountName = async() =>{
        try {
            const accountDoc = doc(db,"users", getAccountId)
            const snapAccountData = await getDoc(accountDoc)
            if (snapAccountData.exists()) {
                console.log("Account data:", snapAccountData.data());
            } else {
                console.log("No such Account!");
            }
            
            setAccountName(snapAccountData.data().username)
        } catch (error) {
            console.log (error)
        }
    }

    const deleteAccountData = (id) =>{
        deleteDoc(doc(db, "users", id ))
    }

    const executeYes = () =>{
        deleteAccountData(getAccountId)
    }

    const executeNo = () =>{
        setGetAccountId("");
        setAccountName("");
    }

    useEffect(() => {
        if(showConfirmRemoveAccount){
            getAccountName()
            console.log(accountName)
        }
    }, [getAccountId])

    return (
    <>
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="confirmUserModal"
    >
        <Modal.Header>
            <Modal.Body>Do you sure you want to remove "{accountName}" from the user database?</Modal.Body>
            <Modal.Footer>
                <Container>
                    <Button
                        onClick={(e)=>{
                            executeYes()
                            handleHideConfirmRemoveAccount()
                        }}
                    >Yes</Button>
                </Container>
                <Container>
                    <Button
                        onClick={(e)=>{
                            executeNo()
                            handleHideConfirmRemoveAccount()
                        }}
                    >No</Button>
                </Container>
            </Modal.Footer>
        </Modal.Header>
    </Modal>
    </>
    )
}
