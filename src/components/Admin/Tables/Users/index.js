import React, {useEffect, useState} from "react";
import {Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { db } from "../../../../firebase";
import { collection, onSnapshot, where, query, doc, deleteDoc } from "firebase/firestore";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash } from '@fortawesome/free-solid-svg-icons'

export default function UserTable(props){
    const [userData, setUserData] = useState([]);
    const fetchUserData = () => {
        const q = query(collection(db, "users"), where("role", "==", 'User'))
        onSnapshot(q,(querySnapshot)=>{
            setUserData(
                querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    data: doc.data()
                }))
            );
        });
    }
    useEffect(()=>{
        if (collection){
            fetchUserData();
        }
    }, [])
    const deleteAccountData = (id) =>{
        deleteDoc(doc(db, "users", id ))
    }
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
                    userData?.map(({ id, data }) =>{
                        return(
                            <tr key={id}>
                                <th>{data.username}</th>
                                <th>{data.email}</th>
                                <th>{data.authProvider}</th>
                                <th>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip-2">Delete this user</Tooltip>}
                                    >
                                        <Button
                                            className="btnAction"
                                            variant="danger"
                                            onClick={() => {
                                                deleteAccountData(id);
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
        </>
    )
}