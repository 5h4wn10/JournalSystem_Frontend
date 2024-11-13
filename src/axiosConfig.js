import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Backend-URL
    withCredentials: true, // Viktigt om servern kräver cookies för autentisering
    headers: {
        'Content-Type': 'application/json'
    }
});

// Funktion för att sätta Basic Auth efter inloggning
export const setAuthHeader = (username, password) => {
    const authToken = `Basic ${window.btoa(`${username}:${password}`)}`;
    axiosInstance.defaults.headers.common['Authorization'] = authToken;
};

export default axiosInstance;
