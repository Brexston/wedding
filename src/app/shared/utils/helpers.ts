import isEqual from 'lodash-es/isEqual';
import isPlainObject from 'lodash-es/isPlainObject';

function isArray(value: unknown): value is unknown[] {
	return Array.isArray(value);
}

function isBoolean(value: unknown): boolean {
	return value === true || value === false
		|| (typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Boolean]');
}

function isDate(value: unknown): value is Date {
	return typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Date]';
}

function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
	return typeof value === 'function';
}

function isNaN(value: unknown): boolean {
	return (typeof value === 'number' && Number.isNaN(value))
		|| (typeof value === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Number]' && Number.isNaN(+value as number));
}

function isNull(value: unknown): value is null {
	return value === null;
}

function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

function isFile(value: unknown): value is File | FileList {
	return value instanceof File || value instanceof FileList;
}

function isArrayOrObject(value: unknown): value is Record<string, unknown> | unknown[] {
	return isPlainObject(value) || isArray(value);
}

export {
	isArray,
	isArrayOrObject,
	isBoolean,
	isDate,
	isEqual,
	isFile,
	isFunction,
	isNaN,
	isNull,
	isPlainObject,
	isUndefined,
};
