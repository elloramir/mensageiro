import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { toast } from 'react-toastify';

const client = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error('Unauthorized. Please log in again.');
            localStorage.removeItem('access_token');
            window.location.href = "/login";
        } else if (error.response) {
            toast.error(error.response.data.detail || 'An error occurred');
        } else {
            toast.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default client;
