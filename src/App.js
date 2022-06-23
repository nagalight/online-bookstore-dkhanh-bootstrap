import logo from './logo.svg';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <NavigationBar/>
    <Footer/>
    </>
  );
}

export default App;
