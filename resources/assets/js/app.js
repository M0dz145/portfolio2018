import Vue from 'vue'
import VApp from './VApp.vue'

// App.scss
require('../sass/app.scss')

// Import logo
require('../img/logo.png')

new Vue({
  el: '#app',
  render: h => h(VApp)
})
