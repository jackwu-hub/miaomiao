<template>
    <div class="cinema">
        <div class="title">
            <div class="top">
                <div @click="handleChangePage('city')">{{cityName}}</div> <!--这个cityName是个全局变量-->
                <div>影院</div>
                <div><i class="icon iconfont icon-search"  @click="handleChangePage('cinema/search')"></i></div>
            </div>

            <div class="select">
                <div @click="handleClick()" :class="isaddShow?'active':''">{{crtyItem}}</div>
                <div>APP订票</div>
                <div>最近去过</div>
            </div>
        </div>

        <div v-show="isaddShow" class="dra"> <!--这是处理当点击时下拉市级选项-->
            <div class="black">
                <div v-for="item in adreelist"
                :key="item"
                @click="handleItem(item)"
                :class="item===crtyItem?'activetwo':''">
                  {{item}}
                </div>
            </div>
        </div>

        <div class="content">
           <div class="adddiv" v-for="data in computedDatalist" :key="data.cinemaId">
               <div class="onediv">
                  <p>{{data.name}}</p>
                  <p class="address">{{data.address}}</p>
               </div>
               <div class="two">
                  <p class="mouny"><span>￥</span>{{data.latitude.toFixed(2)}}<span>起</span></p>
                  <p class="addresss">距离未知</p>
               </div>

            </div>
        </div>
        <TabBar />
    </div>
</template>

<script>

import TabBar from '@/components/TabBar'
import { mapState, mapMutations } from 'vuex' // mapState 是vuex提供的切割函数
export default {
  name: 'Cinema',
  components: {
    TabBar
  },
  data () {
    return {
      // datalist:[],
      isaddShow: false,
      crtyItem: '全城',
      scrollHeight: '0px'
    }
  },
  mounted () {
    // disptch 到 vuex中action
    if (this.cinemalist.length === 0) {
      this.$store.dispatch('cinema/getCinema', this.cityId).then(res => { //这个cityId是在city页面决定的，它是个全局变量
                      //这个cinema取的是store 目录下index.js中的module属性下的值
        console.log('异步结束，已经存到vuex')
    })} else {
      console.log('使用缓存')
    }
  },
  methods: {
    handleClick () {  //这个是点击 开关
      this.isaddShow = !this.isaddShow  //开  关
    },
    handleItem (item) { //这个是点击区地址
      this.crtyItem = item
      this.isaddShow = false //选择后就关闭
    },
    handleChangePage (path) { // 动态路由
      if (path === 'city') {
        // 清空共享状态 vuex cinemaList
        this.setCinema([]) //当变换了城市位置时，cinemalist中的数据也要变换，所以先清空。
      }
     this.$router.push(path)
     //this.$router.push({name: path,params: {path: path}}) // 跳转路径
    },
    ...mapMutations('cinema', ['setCinema']) //相当于this.$store.commit
  },
  computed: {
    ...mapState('cinema', ['cinemalist']), //这里是获取全局变量 cinemalist的值
    ...mapState('city', ['cityName', 'cityId']),
    adreelist () {
      var arr = this.cinemalist.map(item => item.districtName) //利用map方法获取districName对应的值
      arr.unshift('全城') //unshift () 方法将把它的参数插入 arrayObject 的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间
      return Array.from(new Set(arr))  //这个 Set是重复的只保留一份
      //Array.from在这里是将类数组转换成数组
    },
    computedDatalist () {
      if (this.crtyItem === '全城') return this.cinemalist //显示全城的信息
      return this.cinemalist.filter(item => item.districtName === this.crtyItem) //通过districtName来完成过滤
    }
  }
}
</script>

<style lang="scss" scoped>
    .cinema{
        font-size: 14px;
        .title{
            width: 100%;
            position:fixed;
            left: 0;
            top: 0;
            z-index: 20;
            background-color: #fff;
        }
       .top{
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            margin-left: 10px;
            margin-right: 10px;
         }
        .content{
            margin-top: 80px;
            margin-left: 10px;
            margin-right: 10px;
            .adddiv{
                padding-bottom: 15px;
                padding-top: 15px;
                border-bottom: 1px solid rgb(240, 234, 234);
                display: flex;
                justify-content: space-between;
                .onediv{
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
        .dra{
            background-color: rgba(0, 0, 0, 0.5);
            position:fixed;
            width: 100%;
            height: 999px;
            .black{
                display: flex;
                flex-wrap: wrap;
                background-color: #fff;
                width: 100%;
                padding-top: 10px;
                div{
                    margin:2% 2%;
                    width: 20%;
                    text-align: center;
                    line-height:30px;
                    border: 1px solid rgb(238, 236, 236);
                    color: #999;
                    font-size: 12px;
                }
            }
        }
        .select{
            margin-left: 10px;
            margin-right: 10px;
            display: flex;
            justify-content: space-evenly;
            line-height: 40px;
            border-bottom:1px solid  rgb(238, 236, 236);
        }
    }
    .active{
        color:orange;
    }
    .activetwo{
        color:orange;
        border: 1pc solid orange;
    }
</style>

    
