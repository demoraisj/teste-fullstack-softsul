import type { HttpService } from '../httpService';
import { StorageService } from '../storageService';
import type { RegisterPayload } from '../httpService/types';

export type LoginPayload = {
	email: string;
	password: string;
};

export class AuthService {
	/**
	 * Http service global instance.
	 *
	 * @private
	 */
	private readonly httpService: HttpService;

	constructor(httpService: HttpService) {
		this.httpService = httpService;
	}

	public async login(data: LoginPayload) {
		try {
			await this.httpService.csrf();
			await this.httpService.login(data);

			return true;
		} catch (err) {
			return false;
		}
	}

	public async logout() {
		await this.httpService.logout();

		StorageService.clear();

		location.assign('/');
	}

	public async register(payload: RegisterPayload) {
		try {
			await this.httpService.csrf();
			await this.httpService.register(payload);

			return true;
		} catch (err) {
			return false;
		}
	}
}
