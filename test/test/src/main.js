import Vue from 'vue'
import App from './App.vue'
import Mapbox from 'mapbox-gl-vue';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


const app = new Vue({
    el: '#app',
    components: {
        'mapbox': Mapbox
    },
  });
