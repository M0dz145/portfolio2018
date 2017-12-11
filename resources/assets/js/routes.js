import VHome from '@components/VHome';
import VWorks from '@components/VWorks';

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
];