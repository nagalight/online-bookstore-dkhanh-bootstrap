import './App.css';
import React, { useState, Suspense, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./utils/routes";
import { routes } from "./routes";


function App() {
  const [loading, setLoading] = useState(true);

  const handleLoading = () =>{
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }

  useEffect(() => {
    // window.addEventListener("load", handleLoading)
    return () => {
      handleLoading()
    }
  }, [])
  


  return (
    !loading ? (
      <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>{listRoute(routes)}</Routes>
          <Footer/>
        </BrowserRouter>
      </Suspense>
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
