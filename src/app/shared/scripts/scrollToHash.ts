export function initScrollToHash() {
	const hash = location.hash;
	if (!hash)
		return;

	const targetElement = document.querySelector(hash);
	if (!targetElement)
		return;

	targetElement.scrollIntoView();
}
