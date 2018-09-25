import Vue from 'vue';
import App from '@components/app/VApp.vue';
import '@sass/app.scss';
import '@img/logo.png';
import RoutesRegister from "@modules/routing/RoutesRegister";
import Icon from "@modules/icon/Icon";
import LogoImage from '@img/logo.png';
import ServiceWorkerRegister from "@modules/serviceWorker/ServiceWorkerRegister";

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
