import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const axiosInstance = axios.create({
    baseURL: 'https://smart-dancers-yawn-200-129-248-2.loca.lt',
    withCredentials: true,
    headers,
});
