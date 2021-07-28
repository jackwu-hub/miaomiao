const module = {
  namespaced: true, // 命名空间
  state: {
    cityName: window.localStorage.getItem('nowNm') || '北京',
    cityId: window.localStorage.getItem('nowId') || '110100'
  },
  actions: {

  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, id) {
      state.cityId = id
    }
  }
}

export default module
