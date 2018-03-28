import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from '@js/modules/routing/Routes';
import VApp from '@js/components/VApp';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    Routes
});

// App.scss
require('@sass/app.scss');

// Import logo
require('@img/logo.png');

new Vue({
    router,
    render: h => h(VApp)
}).$mount('#app');
