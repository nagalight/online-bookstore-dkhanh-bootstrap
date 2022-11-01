import React from 'react'
import { Container, Image, Modal } from 'react-bootstrap'
import './cart.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function CartModal(props) {
  const {cartItems} = props;
  return (
    <>
    {/* {cartItems.length === 0 && <Container>Cart is empty</Container>} */}
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container className='cartBookWrapper'>
            <Container className='cartBookContainer'>
              <Container className='cartBookImage'>
                <Image 
                  src='https://firebasestorage.googleapis.com/v0/b/za-library-account.appspot.com/o/BookCover%2FSampleCover.png?alt=media&token=929287b3-dd90-4764-b2f9-a1663ead0f5a'
                  style={{
                    width:"50px"
                  }}
                />
              </Container>
              <Container className='cartBookName'>
                <Container className='cartBookNameTitle'>Title</Container>
                <Container className='cartBookNameSubtitle'>By Author</Container>
              </Container>
              <Container className='cartBookPrice'>{Number(100000).toLocaleString("en-US",)}&nbsp;VND</Container>
              <Container className='cartBookDelete'>
                <FontAwesomeIcon icon={faXmark}/>
              </Container>
            </Container>
          </Container>
          
        </Modal.Body>
        <Modal.Footer>
          <Container className='cartTotalPrice'>
            Total Price: {Number(100000000).toLocaleString("en-US",)}&nbsp;VND
          </Container>
        </Modal.Footer>
    </Modal>
    </>
  )
}
