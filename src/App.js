import './App.css';
import React, {useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

import { BrowserRouter, Routes } from "react-router-dom";
import { listRoute } from "./utils/routes";
import { routes } from "./routes";


function App() {
  return (
    <>
    <BrowserRouter>
      <NavigationBar />
      <Routes>{listRoute(routes)}</Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
