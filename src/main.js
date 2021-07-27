import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
/* import BestCity from 'best-city' //这个插件是城市列表 */

import axios from 'axios'
Vue.prototype.axios = axios; //使用prototype给 Vue 增加静态方法，只要是Vue的实例，都共享这个方法。

Vue.filter('actorfilter', function (data) { //过滤主演数组，取出name 
  var newlist = data.map(item => item.name) /* 取data这个对象中的键为name的值，返回是一个数组 */
  //console.log(newlist.join(' ')) /* 把这个数组转换成字符串 */
  return newlist.join(' ')
})

Vue.filter('dateFilter', function (data) {
  return moment(data * 1000).format('YYYY-MM-DD')
}) // 时间戳 毫秒数

Vue.filter('setWH',(url,arg)=>{  //替换为图片链接上的真实尺寸，在传参时宽高要用引号
  return url.replace(/w\.h/,arg)
})

/* Vue.use(BestCity) */


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


