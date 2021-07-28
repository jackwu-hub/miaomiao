import Vue from 'vue'
import Vuex from 'vuex'

import cinema from './module/cinemaModule'
import tabbar from './module/tabbarshowModule'
import city from './module/cityModule'
import comingsoon from './module/comingsoonModule'
Vue.use(Vuex) //向Vue中注册，只有注册了，后面才能够使用new 来构造

export default new Vuex.Store({
  state: {
    isTabbarShow: true,
   },
  
  mutations: { /* 唯一修改状态的位置 */ 
    HideMaizuoTabbar (state, data) { /* 使用Mutations来监视共享组件状态 这个data是Detail.vue中使用commit传过来的 */
      // console.log('HideMaizuoTabbar')
      state.isTabbarShow = data
    },
    ShowMaizuoTabbar (state, data) { /* 使用Mutations来监视共享组件状态 这个data是Detail.vue中使用commit传过来的 */
      // console.log('HideMaizuoTabbar')
      state.isTabbarShow = data
    },
    
  },
  actions: {
    // 异步处理
    
  },
  modules: { //
    cinema,
    tabbar,
    city,
    comingsoon
  }
})
