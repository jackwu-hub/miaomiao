import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BestCity from 'best-city'

Vue.use(BestCity)


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


