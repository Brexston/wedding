/* eslint-disable perfectionist/sort-imports */

// Import styles
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@styles/index.sass';

// Import vue app
import APP from '@/app/app';

document.addEventListener('DOMContentLoaded', () => {
	APP.mount('#app');
});
