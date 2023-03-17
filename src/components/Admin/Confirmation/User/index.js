import React from 'react'
import { Button, Container } from 'react-bootstrap'

export default function ConfirmRemoveUserWindow(props) {
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
            {/* <Modal.Title id="contained-modal-title-vcenter">
                Delete
            </Modal.Title> */}
            <Modal.Body>Do you sure you want to remove this user from the database?</Modal.Body>
            <Modal.Footer>
                <Container>
                    <Button>Yes</Button>
                    <Button>No</Button>
                </Container>
            </Modal.Footer>
        </Modal.Header>
    </Modal>
    </>
  )
}
