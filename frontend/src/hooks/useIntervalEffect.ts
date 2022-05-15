import { useEffect } from 'react';

export function useIntervalEffect(interval: number, deps: any[], callback: () => void) {
	useEffect(() => {
		let isMounted = true;

		if (isMounted) callback();

		const intervalID = setInterval(() => {
			if (isMounted) callback();
		}, interval);

		return () => {
			isMounted = false;
			clearInterval(intervalID);
		};
	}, deps);
}
