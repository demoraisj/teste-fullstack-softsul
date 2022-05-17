import { axiosInstance } from "../instance";
import * as SecureStore from 'expo-secure-store';

export async function httpGetToken(data: { email: string; password: string }) {
    try {
        const res = await axiosInstance.post('/api/token', data);

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

        await SecureStore.setItemAsync('token', res.data.token);

        return true;
    } catch(err) {
        return null;
    }
}