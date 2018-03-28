import VHome from '@components/VHome';

export default [
    {
        name: 'home',
        path: '/',
        component: VHome
    },
    {
        path: '*',
        redirect: '/'
    }
];