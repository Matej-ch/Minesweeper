import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

/*Vue.filter('addLeadingZeros',function (value) {
  return (`00${value}`).slice(-3);
})*/

createApp(App)
    .use(createPinia())
    .mount('#app')