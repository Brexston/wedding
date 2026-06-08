import type { InternalAxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface RequestInfo {
	id: ReturnType<typeof crypto.randomUUID>;
	controller: AbortController;
}

export const useApiStore = defineStore('api', () => {
	const requests = ref<Map<string, RequestInfo[]>>(new Map());

	function registerRequest(config: InternalAxiosRequestConfig) {
		const key = config.key;
		if (!key)
			return config;

		const id = crypto.randomUUID();
		const controller = new AbortController();

		config.id = id;
		config.signal = controller.signal;

		const info: RequestInfo = { id, controller };
		const list: RequestInfo[] = requests.value.get(key) ?? [];

		if (!requests.value.has(key)) {
			requests.value.set(key, [info]);
		}
		else if (config.cancelPrevious) {
			list.forEach(i => i.controller.abort());
			requests.value.set(key, [info]);
		}
		else {
			requests.value.set(key, [...list, info]);
		}

		return config;
	}

	function unregisterRequest(key: string, id?: RequestInfo['id']) {
		const list = requests.value.get(key);
		if (!list)
			return console.warn(`No requests found for key: ${key}`);

		const newList = id
			? list.filter(i => i.id !== id)
			: list.slice(0, -1);

		if (newList.length === 0)
			requests.value.delete(key);
		else
			requests.value.set(key, newList);
	}

	function isPending(key?: string | string[]) {
		if (!key)
			return requests.value.size > 0;
		const keys = Array.isArray(key) ? key : [key];
		return keys.some(k => requests.value.has(k));
	}

	function abortRequest(key: string) {
		const list = requests.value.get(key);
		if (!list)
			return console.warn(`No requests found for key: ${key}`);

		list.forEach(i => i.controller.abort());
		requests.value.delete(key);
	}

	function abortAllRequests() {
		requests.value.forEach(list => list.forEach(i => i.controller.abort()));
		requests.value.clear();
	}

	return {
		registerRequest,
		unregisterRequest,
		isPending,
		abortRequest,
		abortAllRequests,
	};
});
