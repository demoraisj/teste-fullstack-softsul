export type UserData = {
	//
};

export class StorageService {
	public readonly keys = {
		userData: 'softsul-user-data',
	};

	public clear() {
		localStorage.clear();
		sessionStorage.clear();
	}

	public setUserData(userData: UserData) {
		localStorage.setItem(this.keys.userData, JSON.stringify(userData));
	}

	public getUserData() {
		const data = localStorage.getItem(this.keys.userData);

		return data ? JSON.parse(data) : null;
	}
}
