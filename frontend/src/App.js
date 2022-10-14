// import './App.css';
import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game.js'
import Login from './components/Login';
import Menu from './components/Menu';
import { getToken } from './services/authServices.js'
import axios from 'axios';

function App() {

  let [token, setToken] = useState(getToken());
  
  if(!token) {
    console.log(token)
    return <Login setToken={setToken} />
  }
  else{
    axios.defaults.headers.common['Authorization'] = 'Token ' + getToken();
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/game/:code/:char/" element={<Game />}>
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
