import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  useEffect(() => {
    console.log('this is ran once');
  }, [])


  return (
    <div className='app'>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App
