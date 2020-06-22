import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false

Vue.filter('addLeadingZeros',function (value) {
  return (`00${value}`).slice(-3);
})

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')