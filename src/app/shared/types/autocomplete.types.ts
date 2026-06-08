// https:// doka.guide/html/autocomplete/
export type AutocompleteTypes
	// Включение и выключение
	= 'off'
		| 'on'

    // Авторизация
		| 'nickname'
		| 'username'
		| 'email'
		| 'current-password'
		| 'new-password'
		| 'one-time-code'

    // Формы имени
		| 'name'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-prefix'
		| 'honorific-suffix'

    // Данные банковской карты и деньги
		| 'cc-given-name'
		| 'cc-additional-name'
		| 'cc-family-name'
		| 'cc-name'
		| 'cc-csc'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year'
		| 'cc-number'
		| 'cc-type'
		| 'transaction-amount'
		| 'transaction-currency'

    // Личные данные
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'language'
		| 'sex'
		| 'organization'
		| 'organization-title'
		| 'photo'

    // Адрес
		| 'address-level1'
		| 'address-level2'
		| 'address-level3'
		| 'address-level4'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'country'
		| 'country-name'
		| 'street-address'
		| 'postal-code'

    // Телефон
		| 'tel'
		| 'tel-area-code'
		| 'tel-country-code'
		| 'tel-extension'
		| 'tel-local'
		| 'tel-local-prefix'
		| 'tel-local-suffix'
		| 'tel-national'

    // Ссылки
		| 'impp'
		| 'url'
;

export type PasswordAutocompleteTypes
	= 'off'
		| 'on'
		| 'current-password'
		| 'new-password'
;
