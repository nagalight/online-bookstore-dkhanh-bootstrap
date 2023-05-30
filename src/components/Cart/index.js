import React from 'react'
import { Container, Image, Modal, Button } from 'react-bootstrap'
import './cart.css'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, } from '@fortawesome/free-solid-svg-icons'

export default function CartModal(props) {
  const {cartItems, handleAddToCart, handleRemoveFromCart, clearCart, setShowCart} = props;
  const totalPrice = cartItems.reduce((price, item) =>price + item.quantity * item.data.price, 0)
  
  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static">
        <Modal.Header closeButton>
          <Container className='cartBookHeadTitle'>SHOPPING CART</Container>
        </Modal.Header>
        <Modal.Body>
          <Container className='cartClearContainer'>
            <Container className='cartClearAll' onClick={()=>clearCart()}>Remove all book from cart({cartItems.length})</Container>
          </Container>
          <Container className='cartBookWrapper'>
            {cartItems.map(({id, data, quantity})=>{
              return(
                <Container className='cartBookContainer' key={id}>
                  <Container className='cartBookImage'>
                    <Image 
                      src={data.image.url}
                      style={{
                        width:"70px"
                      }}
                    />
                  </Container>
                  <Container className='cartBookName'>
                    <Container className='cartBookNameTitle'>{data.title}</Container>
                    <Container className='cartBookNameSubtitle'>By {data.author}</Container>
                  </Container>
                  <Container className='cartQuantityChange'>
                    <Button variant='white' className='cartQuantityAdd' onClick={()=>handleAddToCart(id, data)}>
                      <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <Button variant='white' className='cartQuantityRemove' onClick={()=>handleRemoveFromCart(id)}>
                      <FontAwesomeIcon icon={faMinus}/>
                    </Button>
                  </Container>
                  <Container className='cartBookPrice'>{quantity}&nbsp;x&nbsp;{Number(data.price).toLocaleString("en-US",)}&nbsp;VND</Container>
                </Container>
              )
            })}
          </Container>
        </Modal.Body>
        <Modal.Footer className='cartTotalPrice'>
          <Container className='cartTotalPriceContainer'>
            Total Price: {Number(totalPrice).toLocaleString("en-US",)}&nbsp;VND
          </Container>
          <Container className='checkOutButton'>
            <Link to={'/payment'}>
              <Button
                onClick={(e)=>{
                  setShowCart(false);
                }}
                style={{fontSize:'1.75vh'}}
              >Process&nbsp;to&nbsp;Payment</Button>
            </Link>
          </Container>
        
        </Modal.Footer>
    </Modal>
    </>
  )
}
