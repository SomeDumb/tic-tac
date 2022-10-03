import jwtDecode from "jwt-decode";

export function getCurrentUser() {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

export function logout() {
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