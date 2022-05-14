import type { AxiosError } from 'axios';
import type { HttpService } from '../httpService';
import type { StorageService } from '../storageService';

export type LoginPayload = {
	username: string;
	password: string;
	accessKey?: boolean;
};

export class AuthService {
	/**
	 * Http service global instance.
	 *
	 * @private
	 */
	private readonly httpService: HttpService;

	/**
	 * Storage service global instance
	 *
	 * @private
	 */
	private readonly storageService: StorageService;

	constructor(httpService: HttpService, storageService: StorageService) {
		this.httpService = httpService;
		this.storageService = storageService;
	}

	/**
	 * Authenticate the user and get the token.
	 * A password or access key can be used.
	 *
	 * @param username  Student enrollment
	 * @param password  Student password or responsible access key
	 * @param accessKey Defines if the password is access key
	 *
	 */
	public async login({ username, password, accessKey = false }: LoginPayload) {
		try {
			await this.httpService.login();

			return true;
		} catch (err) {
			return false;
		}
	}

	public async logout() {
		await this.httpService.logout();

		this.storageService.clear();

		location.assign('/');
	}
}
