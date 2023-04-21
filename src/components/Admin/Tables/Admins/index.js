import React, {useEffect, useState} from "react";
import {Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { db } from "../../../../firebase";
import { collection, onSnapshot, where, query } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'
import ConfirmRemoveAccountWindow from "../../Confirmation/Account";
import useTable from "../../../Pagination/useTable";
import TableFooter from "../../../Pagination/TableFooter";

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

    let rowsPerPage = 5
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(adminData, page, rowsPerPage)

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
                    slice?.map((el) =>{
                        return(
                            <tr key={el.id}>
                                <th>{el.data.username}</th>
                                <th>{el.data.email}</th>
                                <th>{el.data.authProvider}</th>
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
                                                setGetAccountId(el.id);
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
        {adminData.length>5 && <TableFooter range={range} slice={slice} setPage={setPage} page={page}/>}
        
        <ConfirmRemoveAccountWindow show={showConfirmRemoveAccount} onHide={handleHideConfirmRemoveAccount} getAccountId={getAccountId} setGetAccountId={setGetAccountId} showConfirmRemoveAccount={showConfirmRemoveAccount} handleHideConfirmRemoveAccount={handleHideConfirmRemoveAccount}/>
        </>
    )
}