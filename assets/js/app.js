import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@js/modules/routing/Routes';
import VApp from '@js/components/app/VApp';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

// App.scss
require('@sass/app.scss');

// Import logo
require('@img/logo.png');

new Vue({
    router,
    render: h => h(VApp)
}).$mount('#app');
