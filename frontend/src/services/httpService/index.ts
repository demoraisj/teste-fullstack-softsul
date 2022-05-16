import type { AxiosInstance, AxiosError } from 'axios';
import axios from 'axios';
import type { Branch, RegisterPayload, UserData } from './types';
import type { LoginPayload } from '../authService';
import type { InterfaceService } from '../interfaceService';

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

export class HttpService {
	private readonly interfaceService: InterfaceService;

	readonly backend: AxiosInstance;

	constructor(interfaceService: InterfaceService) {
		this.interfaceService = interfaceService;

		this.backend = axios.create({
			baseURL: import.meta.env.PUBLIC_BACKEND_URL,
			withCredentials: true,
			headers,
		});

		this.backend.interceptors.response.use(
			(res) => res,
			async (err) => {
				const axiosError = err as AxiosError;
				const ignoreReqFor = ['/api/login', '/api/register'];
				const ignorePaths = ['/'];

				const { pathname } = window.location;

				const isAuthRequest = ignoreReqFor.some((url) => axiosError.config.url?.includes(url));
				const isIgnoredPath = ignorePaths.some((url) => pathname.includes(url));

				if (axiosError.response?.status === 401 && !isAuthRequest && !isIgnoredPath) {
					location.replace('/');
				}

				if (axiosError.response?.status === 419 && !isAuthRequest) {
					await this.csrf();

					location.reload();
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
		try {
			const url = '/api/branches';

			const res = await this.backend.get(url);

			return res.data;
		} catch (err) {
			this.interfaceService.notify('error', 'Erro ao buscar filiais.');

			throw err;
		}
	}

	public async showBranch(id: number) {
		try {
			const url = `/api/branches/${id}`;

			const res = await this.backend.get(url);

			return res.data;
		} catch (err) {
			this.interfaceService.notify('success', 'Erro ao buscar dados da filial');

			throw err;
		}
	}

	public async createBranch(branch: Branch) {
		try {
			const url = '/api/branches';

			const res = await this.backend.post(url, branch);

			this.interfaceService.notify('success', 'Filial criada.');

			return res.data;
		} catch (err) {
			const axiosError = err as AxiosError<{ message: string }>;

			if (axiosError.response?.status === 422) {
				const message = axiosError.response?.data.message;

				this.interfaceService.notify('warning', message);
				throw err;
			}

			this.interfaceService.notify('error', 'Erro ao criar filial.');
			throw err;
		}
	}

	public async updateBranch(branch: Branch) {
		try {
			const url = `/api/branches/${branch.id}`;

			const res = await this.backend.put(url, branch);

			this.interfaceService.notify('success', 'Filial atualziada.');

			return res.data;
		} catch (err) {
			const axiosError = err as AxiosError<{ message: string }>;

			if (axiosError.response?.status === 422) {
				const message = axiosError.response?.data.message;

				this.interfaceService.notify('warning', message);
				throw err;
			}

			this.interfaceService.notify('error', 'Erro ao atualizar filial.');
			throw err;
		}
	}

	public async deleteBranch(branch: Branch) {
		try {
			const url = `/api/branches/${branch.id}`;

			await this.backend.delete(url);

			this.interfaceService.notify('success', 'Filial deletada.');
		} catch (err) {
			this.interfaceService.notify('error', 'Erro ao deletar filial.');

			throw err;
		}
	}
}
