import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
/* import BestCity from 'best-city' //这个插件是城市列表插件 这里没有使用这个插件 */

import axios from 'axios'  //避免了每次用axios时都要重新引入
Vue.prototype.axios = axios; //使用prototype给 Vue 增加静态方法，只要是Vue的实例，都共享这个方法。

Vue.filter('actorfilter', function (data) { //过滤主演数组，取出name ,这是全局过滤，其他组件如果有相同需求直接调用这个就可以了。
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

import Scroller from '@/components/Scroller'  // 这是引入自定义的组件为全局组件的方式
Vue.component('Scroller',Scroller)  //定义一个better-scroll全局组件， 这样不用在每个需要使用的组件中引入

import Loading from '@/components/Loading' 
Vue.component('Loading',Loading)
  //使用这个有一个条件，要内容器高度比外容器高度高

// 引入 element UI
/* import ElementUI from 'element-ui'  //这是引入第三方插件为全局组件的方式。
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI) */

/* Vue.use(BestCity) */


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


