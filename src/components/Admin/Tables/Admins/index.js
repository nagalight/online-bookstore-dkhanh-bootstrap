import React, {useEffect, useState} from "react";
import {Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { db } from "../../../../firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import ConfirmRemoveAccountWindow from "../../Confirmation/Account";

export default function AdminTable(props){
    const [adminData, setAdminData] = useState([]);
    const fetchAdminData = () => {
        const q = query(collection(db, "users"), where("role", "==", 'Admin'))
        onSnapshot(q,(querySnapshot)=>{
            setAdminData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }
    useEffect(()=>{
        if (collection){
            fetchAdminData();
        }
    }, [])

    const [showConfirmRemoveAccount, setShowConfirmRemoveAccount] = useState(false);
    const handleShowConfirmRemoveAccount = () => setShowConfirmRemoveAccount(true);
    const handleHideConfirmRemoveAccount = () => {
        setShowConfirmRemoveAccount(false);
        setGetAccountId("");
    }

    const [getAccountId, setGetAccountId] = useState("");
    return(
        <>
        <Table  striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Provider</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    adminData?.map(({ id, data }) =>{
                        return(
                            <tr key={id}>
                                <th>{data.username}</th>
                                <th>{data.email}</th>
                                <th>{data.authProvider}</th>
                                <th>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Delete this admin</Tooltip>}
                                    >
                                        <Button
                                            className="btnAction"
                                            variant="danger"
                                            onClick={() => {
                                                setGetAccountId(id);
                                                handleShowConfirmRemoveAccount();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUserSlash}/>
                                        </Button>
                                    </OverlayTrigger>
                                </th>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        <ConfirmRemoveAccountWindow show={showConfirmRemoveAccount} onHide={handleHideConfirmRemoveAccount} getAccountId={getAccountId} setGetAccountId={setGetAccountId} showConfirmRemoveAccount={showConfirmRemoveAccount} handleHideConfirmRemoveAccount={handleHideConfirmRemoveAccount}/>
        </>
    )
}