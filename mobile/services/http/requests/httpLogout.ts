import {screens} from "../../../routing";
import {axiosInstance} from "../instance";

export async function httpLogout(navigate: any) {
    await axiosInstance.delete('api/token');

    navigate({ name: screens.login.name });
}