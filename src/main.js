import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		welcomeMessage: 'welcome to svelte todos!'
	}
});

export default app;