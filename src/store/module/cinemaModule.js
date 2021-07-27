import axios from "axios"
const module = {
  namespaced: true, // 命名空间
  state: {
    cinemalist: []
  },
  mutations: {
    setCinema (state, data) { // 第二个数为传递的参数
      state.cinemalist = data
    }
  },
  // 异步处理
  actions: {
    getCinema (store, id) {
      console.log(store.rootState.city.cityId)

      axios({ //
        url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=6255279`,
        headers: {
         'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"${id}"}`,
         'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinema', res.data.data.cinemas)
      })
    }
  },
  getters: {
    topDatalist (state) {
      return state.cinemalist.slice(0, 5)
    }
  }
}

export default module
