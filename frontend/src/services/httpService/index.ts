import type { AxiosInstance, AxiosError } from 'axios';
import axios from 'axios';
import type { Branch, RegisterPayload, UserData } from './types';
import type { LoginPayload } from '../authService';

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

	/* AUTHENTICATION requests */

	public async csrf() {
		await this.backend.get('/sanctum/csrf-cookie');
	}

	public async login(data: LoginPayload) {
		await this.backend.post('/login', data);
	}

	public async logout() {
		await this.backend.post('/logout');
	}

	public async userData() {
		const res = await this.backend.get('/api/user');

		return res.data as UserData;
	}

	public async register(data: RegisterPayload) {
		await this.backend.post('/register', data);
	}

	/* BRANCH requests */

	public async indexBranches() {
		const url = '/api/branches';

		const res = await this.backend.get(url);

		return res.data;
	}

	public async showBranch(id: number) {
		const url = `/api/branches/${id}`;

		const res = await this.backend.get(url);

		return res.data;
	}

	public async createBranch(data: Branch) {
		const url = '/api/branches';

		const res = await this.backend.post(url, data);

		return res.data;
	}

	public async updateBranch(id: number, data: Branch) {
		const url = `/api/branches/${id}`;

		const res = await this.backend.put(url, data);

		return res.data;
	}

	public async deleteBranch(id: number) {
		const url = `/api/branches/${id}`;

		await this.backend.delete(url);
	}
}
