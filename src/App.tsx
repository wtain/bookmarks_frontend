import { useEffect } from 'react';
import Navbar from './components/UI/Navbar/Navbar';
import './styles/App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter/AppRouter';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import Sidebar from './components/UI/Sidebar/Sidebar'

function App() {

  useEffect(() => TimeAgo.addDefaultLocale(en));

  return (
      <BrowserRouter>
        <Sidebar />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
