import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import AdSlider from './components/AdSlider';

function App() {
  return (
    <>
    <NavigationBar/>
    <AdSlider/>
    <Footer/>
    </>
  );
}

export default App;
