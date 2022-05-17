import {AxiosError} from "axios";
import {screens} from "../../routing";

export async function redirOnUnauthorized(axiosError: AxiosError, navigate: any) {
    const ignoreReqFor = ['/api/token'];

    const isAuthRequest = ignoreReqFor.some((url) => axiosError.config.url?.includes(url));

    if (axiosError.response?.status === 401 && !isAuthRequest) {
        navigate({ name: screens.login.name });
    }

    return Promise.reject(axiosError);
}