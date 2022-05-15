import { useEffect } from 'react';
import type { StoreService } from '../services/storeService';

export const useSubscribeService = <Store extends Record<string, any>>(
	service: StoreService<Store>,
	cb: (store: Store) => void
) => {
	useEffect(() => {
		const subscriptionKey = service.subscribe((store) => {
			cb(store);
		});

		return () => {
			service.unsubscribe(subscriptionKey);
		};
	}, []);
};
