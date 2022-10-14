import axios from 'axios';

export async function getRoom(code){
    const room = await axios({
        url: '/api/room/'+code+'/',
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.data)
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
      .catch((err) => { console.log(err) });
    return room
}