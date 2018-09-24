import Vue from 'vue';
import App from '@components/app/VApp.vue';
import '@sass/app.scss';
import '@img/logo.png';
import RoutesRegister from "@modules/routing/RoutesRegister";
import Icon from "@modules/icon/Icon";
import LogoImage from '@img/logo.png';

// new ComponentsLoader(Vue);
const routeRegister = new RoutesRegister(Vue);

new Icon(LogoImage);

new Vue({
    router: routeRegister.getRouter(),
    render: h => h(App)
}).$mount('#app');
