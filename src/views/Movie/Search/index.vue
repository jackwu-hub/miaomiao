<template>
  <div class="searchapp">
    <div class="searchtop">
      <input type="text"  v-model="mytext" placeholder="输入影城名称">
      <span @click="handleBack()">取消</span>
    </div>

    <div class="content" v-show="mytext">
      <div v-if="searchDataList.length">
        <div class="adddiv" v-for="data in searchDataList" :key="data.cinemaId">
            <div class="one">
              <p>{{data.name}}</p>
              <p class="address">{{data.address}}</p>
            </div>
            <div class="two">
              <p class="mouny"><span>￥</span>{{data.latitude.toFixed(2)}}<span>起</span></p> <!--toFixed 四舍五入留2位小数位-->
              <p class="addresss">距离未知</p>
            </div>
        </div>
      </div>
      <div v-else>没有内容</div>
    </div>

    <div v-show="!mytext">
      <p class="searchp">离你最近</p>
      <span class="city" v-for="item in searchCrty" :key="item.cinemaId">{{item.name}}</span>
    </div>

   </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      mytext: ''
    }
  },
  methods: {
    ...mapMutations('tabbar', ['hide', 'show']), // 把tabbar命名空间的hide,show 截出
    ...mapActions('cinema', ['getCinema']), //
    handleBack () {
      this.$router.back() // 返回上一个页面
    }
  },
  computed: {
    ...mapState('cinema', ['cinemalist']),
    ...mapGetters('cinema', ['topDatalist']), //取前5个
    searchCrty () {
      return this.topDatalist
    },
    searchDataList () { //命名或字母大小写都可以
      return this.cinemalist.filter(item => item.name.includes(this.mytext) || item.name.toUpperCase().includes(this.mytext) ||
      item.name.toLowerCase().includes(this.mytext))
    }
  },
  mounted () {
    // 同步状态 -提交到mutation
    this.hide()
    // disptch 到 vuex中action
    if (this.cinemalist.length === 0) { //使用的也是缓存 
      this.getCinema("this.cityId") //因为在methods引入 了，所以这里直接调用
    } else {
      console.log('使用缓存')
    }
  },
  destroyed () { //离开这个页面就显示tab
    this.show()
  }
}
</script>

<style lang="scss" scoped>
  .searchapp{
    margin:16px 20px;
    .searchtop{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid rgb(241, 241, 241);
      input{
        outline: none;
        width: 82%;
        height: 30px;
        background-color: rgb(238, 238, 238);
        border: none;
        font-size: 12px;
      }
    }
    .searchp{
       font-size: 12px;
       color: #999;
       margin-top: 14px;
       margin-bottom: 14px;
    }
    .city{
      font-size: 12px;
      background-color:rgb(241, 241, 241);
      display: inline-block;
      padding: 5px;
      margin: 5px;
    }
    .content{
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        .adddiv{
            padding-bottom: 15px;
            padding-top: 15px;
            border-bottom: 1px solid rgb(240, 234, 234);
            display: flex;
            justify-content: space-between;
            .one{
                width: 60%;
                p{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            .two{
                text-align: center;
                .mouny{
                    color:tomato;
                    font-size: 15px;
                    span{
                        font-size: 10px;
                    }
                }
            }

            .address{
                color: #999;
                font-size: 12px;
                padding-top: 5px;
            }
            .addresss{
                color: #999;
                font-size: 12px;
                padding-top: 5px;
            }
        }

    }
  }
</style>
