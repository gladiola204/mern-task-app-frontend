import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000',
    validateStatus: () => true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
})

export default request;

// https://mern-task-app-api-8ty5.onrender.com