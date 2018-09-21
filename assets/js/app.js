import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@js/modules/routing/Routes';
import VApp from '@js/components/app/VApp';
import '@sass/app.scss';
import '@img/logo.png';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    router,
    render: h => h(VApp)
}).$mount('#app');
