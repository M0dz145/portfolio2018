import {RouteConfig} from "vue-router";
import VHome from "@components/home/VHome.vue";
import VWorks from "@components/works/VWorks.vue";

export default [
    {
        name: 'home',
        path: '/',
        component: VHome
    },
    {
        name: 'works',
        path: '/works',
        component: VWorks
    },
    {
        path: '*',
        redirect: '/'
    }
] as Array<RouteConfig>;