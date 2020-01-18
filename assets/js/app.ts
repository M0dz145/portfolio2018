import Vue from 'vue';
import App from '@components/app/VApp.vue';
import '@sass/app.scss';
import '@img/logo.png';
import RoutesRegister from "@modules/routing/RoutesRegister";
import ServiceWorkerRegister from "@modules/serviceWorker/ServiceWorkerRegister";
import '@img/logo-192x163.png';
import '@img/logo-512x435.png';
import WelcomeConsole from "@modules/console/WelcomeConsole";
import Translation from "@modules/translation/Translation";
import HeadController from "@modules/head/HeadController";

// Register applications routes
const routeRegister = new RoutesRegister(Vue);

// Configure metas tags and HTML lang attribute
new HeadController();

if (process.env.NODE_ENV === 'production') {
    // Register service worker
    new ServiceWorkerRegister();

    // Welcome message in console for developers
    new WelcomeConsole();
}

// Run instance app
new Vue({
    router: routeRegister.getRouter(),
    i18n: Translation,
    render: h => h(App)
}).$mount('#app');
