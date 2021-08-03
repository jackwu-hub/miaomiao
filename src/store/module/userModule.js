const  module={
    namespaced: true,
    state: {
        name : window.localStorage.getItem('name') || '',   //本地存储的作用是 当你不是通过页面跳转来的，而是通过直接输入url，这时就要通过获取本地存储来得到用户信息
        isAdmin : window.localStorage.getItem('isAdmin') ||  false,
        userHead : ''   //用户头像
    },
    mutations: {
        USER_NAME(state , payload){
            state.name = payload.name;
            state.isAdmin = payload.isAdmin;
            state.userHead = payload.userHead;
        }
    },
    actions: {

    }
}

    

export default module