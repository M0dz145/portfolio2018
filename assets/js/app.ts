import Vue from 'vue';
import App from '@components/app/VApp.vue';
import '@sass/app.scss';
import '@img/logo.png';
import RoutesRegister from "@modules/routing/RoutesRegister";
import Icon from "@modules/icon/Icon";
import ServiceWorkerRegister from "@modules/serviceWorker/ServiceWorkerRegister";
import LogoImage from '@img/logo.png';
import '@img/logo-192x163.png';
import '@img/logo-512x435.png';

// new ComponentsLoader(Vue);

// Register applications routes
const routeRegister = new RoutesRegister(Vue);

// Add browser icon
new Icon(LogoImage);

// Register service worker
new ServiceWorkerRegister();

// Run instance app
new Vue({
    router: routeRegister.getRouter(),
    render: h => h(App)
}).$mount('#app');
