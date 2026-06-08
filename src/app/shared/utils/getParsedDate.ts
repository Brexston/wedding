// Принимает дату в формате DD.MM.YYYY
export function getParsedDate(date?: string | Date) {
	if (!date)
		return;

	if (date instanceof Date)
		return date;

	const [day, month, year] = date.split('.').map(Number);
	return new Date(year!, month! - 1, day);
}
