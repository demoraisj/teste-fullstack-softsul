import type { Unsubscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export class StoreService<StoreType extends Record<string, any>> {
	protected readonly store: Writable<StoreType>;

	protected unsubscribers: [string, Unsubscriber][] = [];

	public readonly defaultState: StoreType;

	constructor(defaultState: StoreType) {
		this.store = writable(defaultState);
		this.defaultState = defaultState;
	}

	/**
	 * Takes a callback that will run everytime the store value changes
	 *
	 * @param cb Callback
	 */
	subscribe(cb: (store: StoreType) => void) {
		const unsubscriber = this.store.subscribe(cb);

		const key = Math.random().toString(36).slice(2);

		this.unsubscribers.push([key, unsubscriber]);

		return key;
	}

	/**
	 * Stop listening for changes for a specific listener
	 *
	 * @param key Subscriber key
	 */
	unsubscribe(key: string) {
		const unsubscribe = this.unsubscribers.find(([k]) => k === key);

		if (unsubscribe) unsubscribe[1]();
	}

	/**
	 * Reset store to his default values
	 *
	 */
	reset() {
		this.store.set(this.defaultState);
	}

	/**
	 * Completely override a store value
	 *
	 * @param state
	 */
	replace(state: StoreType) {
		this.store.set(state);
	}

	/**
	 * Merge values to a store
	 *
	 * @param state
	 */
	assign(state: Partial<StoreType>) {
		this.store.update((store) => ({ ...store, ...state }));
	}
}
