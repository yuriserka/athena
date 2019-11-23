import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import Buefy from 'buefy';

import 'buefy/dist/buefy.css';
import 'vue-material/dist/vue-material.min.css'

Vue.use(Buefy);
Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')