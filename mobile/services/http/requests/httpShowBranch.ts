import {AxiosError} from "axios";
import {redirOnUnauthorized} from "../tools";
import {axiosInstance} from "../instance";

export async function httpShowBranch(id: number, navigate: any) {
    try {
        const url = `/api/branches/${id}`;

        const res = await axiosInstance.get(url);

        return res.data;
    } catch (err) {
        await redirOnUnauthorized(err as AxiosError, navigate);

        throw err;
    }
}