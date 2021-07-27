const module = {
  namespaced: true, // 命名空间
  state: {
    isTabberShow: true
  },
  mutations: {
    show (state) {
      state.isTabberShow = true
    },
    hide (state) {
      state.isTabberShow = false
    }
  }
}

export default module
