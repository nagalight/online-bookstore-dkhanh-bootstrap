import './App.css';
import React, { useState, Suspense, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./utils/routes";
import { routes } from "./routes";

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

  return (
    !isLoading ? (
      <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>{listRoute(routes)}</Routes>
      </BrowserRouter>
      <Footer/>
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
