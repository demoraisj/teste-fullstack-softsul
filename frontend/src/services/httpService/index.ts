import type { AxiosInstance, AxiosError } from 'axios';
import axios from 'axios';

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

export class HttpService {
	backend: AxiosInstance;

	constructor() {
		this.backend = axios.create({
			baseURL: import.meta.env.PUBLIC_BACKEND_URL,
			withCredentials: true,
			headers,
		});

		this.backend.interceptors.response.use(
			(res) => res,
			(err) => {
				const axiosError = err as AxiosError;
				const ignoreReqFor = ['/api/login', '/api/register'];

				const isAuthRequest = ignoreReqFor.some((url) => axiosError.config.url?.includes(url));

				if (axiosError.response?.status === 401 && !isAuthRequest) {
					location.replace('/');
				}

				return Promise.reject(err);
			}
		);
	}

	public async csrf() {
		await this.backend.get('/sanctum/csrf-cookie');
	}

	public async login() {
		await this.backend.get('/login');
	}

	public async logout() {
		await this.backend.post('/logout');
	}

	public async userData() {
		await this.backend.get('/user');
	}
}
