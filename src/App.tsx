import { useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/AppRouter/AppRouter';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import Sidebar from './components/UI/Sidebar/Sidebar'
import AuthService from './services/AuthService';

function App() {

  const authService = new AuthService();

  useEffect(() => TimeAgo.addDefaultLocale(en));

  return (
      <BrowserRouter>
        <Sidebar authService={authService} />
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
