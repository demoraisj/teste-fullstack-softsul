import axios from "axios";
import { BACKEND_URL } from '@env';

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers,
});
