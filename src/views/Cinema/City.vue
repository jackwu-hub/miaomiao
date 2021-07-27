<template>
  <div>
    <div class="searchtop">
      <input type="text"  v-model="mytext" placeholder="输入城市名称/首字母">
      <span @click="handleBack()">取消</span>
    </div>
    <van-index-bar :index-list="indexlist">
      <div v-for="(data,index) in datalist" :key="index">
        <van-index-anchor  :index="data.index">{{data.index}}</van-index-anchor>
       <van-cell v-for="(item,index) in data.list" :key="index" :title="item.name" @click="handleClick(item)"/>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { IndexBar, IndexAnchor, Cell } from 'vant'
Vue.use(IndexBar).use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      indexlist: [],
      datalist: []
    }
  },
  mounted () {
    this.axios({ //
         url: 'https://m.maizuo.com/gateway?k=9548036',
         headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"110100"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
    }).then(res => {
      // 向zimuarray方法传入获取到的数组
      this.zimuarray(res.data.data.cities)
    })
  },
  methods: {
    zimuarray (citys) {
      var letterArr = []
      for (var i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }
      console.log(letterArr)

      // filter 遍历26个字母， 跟citys数据.pinyin.首字母.大写 进行过滤
      var cityArr = []
      for (let j = 0; j < letterArr.length; j++) {
        var temparr = citys.filter(item =>
          item.pinyin.substring(0, 1).toUpperCase() === letterArr[j])
        // temparr不为空,将当前字母和首字母相同的城市添加到cityArr
        temparr.length && cityArr.push({
          index: letterArr[j],
          list: temparr
        })
        // temparr不为空，将存在的将当前字母存入indexlist
        temparr.length && this.indexlist.push(letterArr[j])
      }
      this.datalist = cityArr
    },
    // city命名空间中，取出setCityName,setCityId
    handleClick (item) {
      // 传递name  cityid 到vuex存储
      this.setCityName(item.name) 
      this.setCityId(item.cityId)
      this.$router.back() //从哪个页面点进来的就返回到哪个页面
    },
    ...mapMutations('city', ['setCityName', 'setCityId']),//相当于this.$store.commit
     //前面city代表键 也就是说它把 setCityName和setCityId这两个方法映射到了store中的mutations中的两个方法
    handleBack () {
      this.$router.back() // 返回上一个页面
    }
  },

}
</script>

<style lang="scss" scoped>
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
</style>