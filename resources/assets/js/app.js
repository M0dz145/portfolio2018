import Vue from 'vue'
import App from './App.vue'

// App.scss
require('../sass/app.scss')

new Vue({
  el: '#app',
  render: h => h(App)
})
