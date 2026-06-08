/* eslint-disable perfectionist/sort-imports */

// Import styles
import 'unfonts.css';
import '@styles/index.sass';

// Import vue app
import APP from '@/app/app';

document.addEventListener('DOMContentLoaded', () => {
	APP.mount('#app');
});
