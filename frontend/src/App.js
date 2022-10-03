import './App.css';
import React, {useEffect, useState, useDebugValue} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from './components/Game.js'
import Login from './components/Login';
import Menu from './components/Menu';
import { getToken } from './services/authServices.js'

function App() {

  let [token, setToken] = useState(getToken());
  
  if(!token) {
    console.log(token)
    return <Login setToken={setToken} />
  }

  return (
    <div className="App">
      <Menu/>
    </div>
  );
}

export default App;
