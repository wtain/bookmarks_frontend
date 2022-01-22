import React from 'react';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
