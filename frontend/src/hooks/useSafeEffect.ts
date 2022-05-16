import { useEffect } from 'react';

export function useSafeEffect(cb: () => void, deps: any[] = []) {
	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			cb();
		}

		return () => {
			isMounted = false;
		};
	}, deps);
}
