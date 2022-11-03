import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminManagement from './pages/Admin';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import InconstructionPage from './pages/InconstructionPage';
import BookDetailPage from './pages/BookDetailPage';
import AllBook from './pages/AllBook';
import GenrePage from './pages/GenrePage';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () =>{
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  useEffect(() => {
    if (document.referrer === "") {
      return(
        handleLoading()
      )
    }else{
      setIsLoading(false)
    }
  }, [])

  const [cartItems, setCartItems] = useState(
    !window.sessionStorage.getItem('ZA_LIBRARY_CART_ITEM') ? 
      [] : JSON.parse(window.sessionStorage.getItem('ZA_LIBRARY_CART_ITEM'))
  );

  const handleAddToCart = ({id, data}) =>{
    const bookExist = cartItems.find((item) => item.id === id);
    if (bookExist){
      setCartItems(cartItems.map((item)=> item.id === id ? {...bookExist, quantity:bookExist.quantity + 1} : item));
    }else{
      setCartItems([...cartItems,{...{id, data}, quantity: 1}])
    }
  }
  const handleRemoveFromCart = (id) =>{
    const bookExist = cartItems.find((item) => item.id === id);
    if (bookExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !== id));
    }else{
      setCartItems(cartItems.map((item)=> item.id === id ? {...bookExist, quantity:bookExist.quantity - 1} : item))
    }
  }
  const clearCart = () =>{
    setCartItems([])
  }

  useEffect(() => {
    window.sessionStorage.setItem('ZA_LIBRARY_CART_ITEM', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    const cartData = window.sessionStorage.getItem('ZA_LIBRARY_CART_ITEM');
    if (cartData !== null){
      setCartItems(JSON.parse(cartData))
    }
  }, [])
  
  

  return (
    !isLoading ? (
      <>
      <BrowserRouter>
        <NavigationBar 
          cartItems={cartItems} 
          handleAddToCart={handleAddToCart} 
          handleRemoveFromCart={handleRemoveFromCart}
          clearCart={clearCart}
        />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminManagement/>}/>
          <Route path="/*" element={<NotFoundPage/>}/>
          <Route path="/404" element={<NotFoundPage/>}/>
          <Route path="/inconstruction" element={<InconstructionPage/>}/>
          <Route path="/genres/:genre" element={<GenrePage handleAddToCart={handleAddToCart}/>}/>
          <Route exact path="/books" element={<AllBook handleAddToCart={handleAddToCart}/>} />
          <Route exact path="/books/:id" element={<BookDetailPage/>} handleAddToCart={handleAddToCart}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </>
    ) : (
      <div id='spinner' className='loadingWrapper'>
        <img className='loadingImage' src="images/Navbar/ZA_icon.png" />
        <div className='loading'></div>
      </div>
    )
  );
}

export default App;
