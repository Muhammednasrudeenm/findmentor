import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/payment' });

export const processPayment = (data) => API.post('/process', data);

export default API;
