import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:80',
    validateStatus: () => true,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
})

export default request;