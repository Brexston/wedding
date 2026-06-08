import type { MaskInputOptions, MaskOptions } from 'maska';

const phoneStartsWith9Regex = /^9|^\+\d/;
const phoneStartsWithDigitRegex = /^\d|^\+\d/;

const phoneMask: MaskInputOptions = {
	mask: '+7 (###) ###-##-##',
	preProcess: (value: string) => {
		if (value.startsWith('9') || value.startsWith('+9'))
			return value.replace(phoneStartsWith9Regex, '79');

		return value.replace(phoneStartsWithDigitRegex, '7');
	},
	eager: true,
};

const codeMask: MaskOptions = {
	mask: '######',
	eager: true,
};

const cartCounterMask: MaskOptions = {
	mask: '###',
	eager: true,
};

const priceMask = {
	mask: '0',
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
	},
	preProcess: (val: string) => val.replace(/[₽\s]/g, ''),
	postProcess: (val: string) => {
		if (!val)
			return '';
		const valNum = Number.parseFloat(val);
		return valNum.toLocaleString('ru-RU', {});
	},

};

const decimalMask: MaskOptions = {
	mask: '0.9',
	eager: true,
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
		9: {
			pattern: /\d/,
			optional: true,
			multiple: true,
		},
	},
};

const integerMask: MaskOptions = {
	mask: '0',
	tokens: {
		0: {
			pattern: /\d/,
			multiple: true,
		},
	},
};

export { cartCounterMask, codeMask, decimalMask, integerMask, phoneMask, priceMask };
