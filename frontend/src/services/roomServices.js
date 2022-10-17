import axios from 'axios';
import {logout} from './authServices'

export async function getRoom(code, setToken){
    const room = await axios({
        url: '/api/room/'+code+'/',
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.data)
      .catch(function (error) {
        if (error.response.status === 401) {
          logout(setToken);
        }
      });
    return room
}

export async function createRoom(setToken){
    const room = await axios({
        url: '/api/room/',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.data)
      .catch(function (error) {
        if (error.response.status === 401) {
            logout(setToken);
        }
      });
    return room
}