import VHome from '@components/VHome';
import VWorks from '@components/VWorks';
import VSlide from '@components/VSlide';

export default [
    {
        name: 'home',
        path: '/',
        component: VHome
    },
    {
        name: 'works',
        path: '/works/:name',
        component: VWorks,
        children: [
            {
                path: '',
                component: VSlide
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
];