import type { HttpService } from '../httpService';
import { StorageService } from '../storageService';

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

	/**
	 * Authenticate the user and get the token.
	 * A password or access key can be used.
	 *
	 * @param username  Student enrollment
	 * @param password  Student password or responsible access key
	 * @param accessKey Defines if the password is access key
	 *
	 */
	public async login({ email, password }: LoginPayload) {
		try {
			await this.httpService.login();

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
}
