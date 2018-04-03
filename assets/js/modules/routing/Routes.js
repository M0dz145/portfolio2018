import VHome from '@components/home/VHome';
import VWorks from '@components/works/VWorks';

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