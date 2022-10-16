import axios from 'axios';
import {logout} from './authServices'

export async function getRoom(code){
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
            console.log('catched');
        }
      });
    return room
}

export async function createRoom(){
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
            console.log('catched');
            logout();
        }
      });
    return room
}