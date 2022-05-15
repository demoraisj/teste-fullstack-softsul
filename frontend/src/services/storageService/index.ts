import type { UserData } from '../httpService/types';
import type { HttpService } from '../httpService';

export class StorageService {
	private readonly httpService: HttpService;

	public readonly keys = {
		userData: 'softsul-user-data',
	};

	constructor(httpService: HttpService) {
		this.httpService = httpService;
	}

	public static clear() {
		localStorage.clear();
		sessionStorage.clear();
	}

	public setUserData(userData: UserData) {
		localStorage.setItem(this.keys.userData, JSON.stringify(userData));
	}

	public async getUserData() {
		const data = localStorage.getItem(this.keys.userData);

		if (!data) {
			const userData = await this.httpService.userData();

			this.setUserData(userData);

			return userData;
		}

		return JSON.parse(data);
	}
}
