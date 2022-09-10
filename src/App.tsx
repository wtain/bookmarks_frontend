import React, { useEffect } from 'react';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter/AppRouter';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

function App() {

  useEffect(() => TimeAgo.addDefaultLocale(en));

  return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
