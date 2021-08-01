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
                url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=2&k=4743202`,
                headers: { //本来这里如果 加上X-Client-Info 这个字段，但是它报了 http请求头信息异常，我就把这个字段 删除了，就可以了
                'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                console.log(id)
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