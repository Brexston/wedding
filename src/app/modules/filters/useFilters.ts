import type { Params } from '@app/modules/filters/filters.types';

export function useFilters() {
	function onUpdateFilters(params: Params, { field, value }: { field: string; value: unknown }) {
		if (!value)
			delete params[field];
		else
			params[field] = value;
	}

	return {
		onUpdateFilters,
	};
};
