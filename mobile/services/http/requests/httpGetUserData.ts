import {UserData} from "../types";
import {AxiosError} from "axios";
import {redirOnUnauthorized} from "../tools";
import {axiosInstance} from "../instance";

export async function httpGetUserData(navigate?: any) {
    try {
        const res = await axiosInstance.get('/api/user');

        return res.data as UserData;
    } catch(err) {
        if (navigate) await redirOnUnauthorized(err as AxiosError, navigate);

        throw err;
    }
}