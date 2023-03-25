import React, {useState} from 'react'
import { Container, Modal, Form, Button } from 'react-bootstrap';
import { adminAddAdmin } from "../../../../firebase";

export default function AddAdminForm(props) {
    const {onHide} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const addAdmin = () => {
        adminAddAdmin(username, email, password);
        onHide();
    };
    return(
        <>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="addAdminModal"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Admin Account
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="formWrapper">
                    <Form className="adduserForm">
                        <Form.Group className="mb-3" >
                            <Form.Label>Username:</Form.Label>
                            <Form.Control 
                                type="username" 
                                size="lg" 
                                id="username"
                                value={username}
                                placeholder="Enter your Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                size="lg" 
                                id="email" 
                                value={email}
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                size="lg" 
                                id="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" size="lg" onClick={addAdmin}>Add Account</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}
