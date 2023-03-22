import axios from 'axios';

const request = axios.create({
    baseURL: 'https://mern-task-app-api-8ty5.onrender.com',
    validateStatus: () => true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})

export default request;