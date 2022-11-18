import axios from 'axios';
const BASE_URL = 'https://shedule-backend.onrender.com/api';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
});
