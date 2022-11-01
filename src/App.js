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

  const [cartItems, setCartItems] = useState([]);

  return (
    !isLoading ? (
      <>
      <BrowserRouter>
        <NavigationBar cartItems={cartItems}/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/admin" element={<AdminManagement/>}/>
          <Route path="/*" element={<NotFoundPage/>}/>
          <Route path="/404" element={<NotFoundPage/>}/>
          <Route path="/inconstruction" element={<InconstructionPage/>}/>
          <Route exact path="/books/:id" element={<BookDetailPage/>}/>
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
