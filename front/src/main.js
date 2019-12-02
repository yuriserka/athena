import Vue from 'vue';
import VueMaterial from 'vue-material';
import Buefy from 'buefy';

import App from './App.vue';
import ConfigStorage from './ConfigStorage.vue';
import NotFound from './NotFound.vue';
import Help from './Help.vue';

import 'buefy/dist/buefy.css';
import 'vue-material/dist/vue-material.min.css';

Vue.use(Buefy);
Vue.use(VueMaterial);
Vue.config.productionTip = false;

const routes = {
    '/': App,
    '/help': Help,
    '/config': ConfigStorage
};

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            return routes[this.currentRoute] || NotFound;
        }
    },
    render(h) {
        return h(this.ViewComponent);
    }
});
