import Vue from 'vue';
import exemple from './components/exemple/ExampleComponent';

const app = new Vue({
    render: createEle => createEle(exemple)
}).$mount('#app');