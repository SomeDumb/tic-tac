import axios from 'axios';

export function logout(setToken) {
    setToken('');
    localStorage.removeItem("token");
}

export function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString
};

export function saveToken(setToken, jsonToken) {
    if (typeof jsonToken !== 'undefined'){
        let token = jsonToken?.token
        localStorage.setItem('token', token);
        setToken(token)
    }
};

export async function loginUser(credentials) {
    const token = await axios({
        url: '/api-token-auth/',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(credentials),
      })
      .then(res => res.data);
    return token
  }
  
export async function registerUser(credentials){
    await axios({
        url: "/api/users/",
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        data: JSON.stringify(credentials)
    })
    .then(res => res.data)
}