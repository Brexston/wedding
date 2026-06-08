export type KeyPaths<T, Prev extends string = ''>
	= T extends string | number | boolean | ((...args: any[]) => any)
		? Prev
		: { [K in keyof T & string]: KeyPaths<T[K], `${Prev}${Prev extends '' ? '' : '.'}${K}`> }[keyof T & string];

export type ValueByPath<T, Path extends string>
	= Path extends `${infer Head}.${infer Tail}`
		? Head extends keyof T ? ValueByPath<T[Head], Tail> : never
		: Path extends keyof T ? T[Path] : never;

// Тип для проверки, что английская локаль имеет те же ключи, что и русская
export type SameKeys<T, U> = {
	[K in keyof T]: K extends keyof U
		? T[K] extends object
			? SameKeys<T[K], U[K]>
			: unknown // Разрешаем любые значения, лишь бы тип был совместим (string, function и т.д.)
		: never; // Если ключа нет в U - ошибка
};
