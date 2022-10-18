// import './App.css';
import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './components/Game.js'
import Login from './components/Login';
import Menu from './components/Menu';
import { getToken } from './services/authServices.js'
import axios from 'axios';
import { BorderBox } from './components/BorderBox'
import Grid from '@mui/material/Grid';
import AccountMenu from './components/Profile'

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
        <BorderBox>
        <Grid container justifyContent="flex-end">
              <AccountMenu setToken={setToken}/>
            </Grid>
        <Routes>

            <Route path="/" element={<Menu setToken={setToken}/>}></Route>
            <Route path="/game/:code/:char/" element={<Game setToken={setToken}/>}>
            </Route>
        </Routes>

        </BorderBox>
      </div>
    );
  }
}

export default App;
