import axios from 'axios'
const module = {
    namespaced: true, // 命名空间
      state: {
        comingList: [] /* 使用actions实现异步缓存 第一步把页面数据当成一个状态来管理，先在state对象中创建一个属性comingList来存放axios请求获取的数据，第二步在需要缓存的页面中去判断，这个数组中有没有数据 只要页面不刷新它就一直存在 */
      },
      mutations: {
        comingListMutation (state, data) {
            state.comingList = data /* 第四步把axios获取数据复制给 comingList */
          }
      },
    actions: {
            // 异步处理
        getComingListAction (store,id) { /* 第三步 传入store这个参数 */
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=1264736`,
                headers: {
                'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc","${id}"}`,
                'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(res.data)
                store.commit('comingListMutation', res.data.data.films) /* 把请求到的数据提交到Mutation进行监控 */
            })
        }
    },
    getters: { /* 类似计算属性，取出想要的数据，如前3个数据  在Commingsoon.vue中这样调用  this.$store.getters.comingListGetter */
        comingListGetter (state) {
            return state.comingList.filter((item, index) => index < 3)
        }
    }
}
export default module