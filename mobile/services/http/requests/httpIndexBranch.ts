import {Branch} from "../types";
import {AxiosError} from "axios";
import {redirOnUnauthorized} from "../tools";
import {axiosInstance} from "../instance";

export async function httpIndexBranches(navigate: any) {
    try {
        const url = '/api/branches';

        const res = await axiosInstance.get(url);

        return res.data as Branch[];
    } catch (err) {
        await redirOnUnauthorized(err as AxiosError, navigate);

        throw err;
    }
}