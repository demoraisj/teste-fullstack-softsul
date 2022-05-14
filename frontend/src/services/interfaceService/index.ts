import { StoreService } from '../storeService';

export type InterfaceStorage = {
	drawerOpen: boolean;
	notifications: {
		message: string;
		type: 'success' | 'error' | 'info' | 'warning';
		opened: boolean;
	};
};

export const interfaceStorageDefaults: InterfaceStorage = {
	drawerOpen: false,
	notifications: {
		message: '',
		type: 'info',
		opened: false,
	},
};

export class InterfaceService extends StoreService<InterfaceStorage> {
	constructor() {
		super(interfaceStorageDefaults);
	}

	toggleDrawerOpen() {
		this.store.update((store) => ({
			...store,
			drawerOpen: !store.drawerOpen,
		}));
	}

	notify(type: InterfaceStorage['notifications']['type'], message?: string, timeout = 5000) {
		let messageToSet = message;

		if (!messageToSet) {
			switch (type) {
				case 'success':
					messageToSet = 'Operação realiada com sucesso';
					break;
				case 'error':
					messageToSet = 'Houve um erro ao realizar a operação';
					break;
				default:
					messageToSet = '';
					break;
			}
		}

		this.store.update((store) => ({
			...store,
			notifications: {
				opened: true,
				message: messageToSet ?? '',
				type,
			},
		}));

		setTimeout(() => {
			this.store.update((store) => ({
				...store,
				notifications: {
					...store.notifications,
					opened: false,
				},
			}));
		}, timeout);
	}
}
