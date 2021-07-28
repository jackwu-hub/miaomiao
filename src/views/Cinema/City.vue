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
import {messageBox} from '@/components/JS' //调用自定义的弹窗组件
Vue.use(IndexBar).use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      indexlist: [],
      datalist: [],
      mytext: ''
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
    }),
     setTimeout(()=>{  //过3秒再弹出
        this.axios({ //这个是请求定位的
            url: 'https://m.maizuo.com/gateway?k=2519051',
            headers: {
              'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"440100"}',
              'X-Host': 'mall.film-ticket.city.locate'
            }
        }).then(res => {
          // 向zimuarray方法传入获取到的数组
            var msg=res.data.msg
            if(msg==='ok'){
              //console.log(res.data.data.city.name)
              var name=res.data.data.city.name
              var id=res.data.data.city.cityId
              //if(this.$store.state.city.cityId===id){return;} //这个是解决当前定位相同时才还跳出弹窗的问题 ，但是因为它们一个是字符串，一个是数字所以
              if(this.$store.state.city.cityId==id){return;} //用两个== ，这样类型会自动转换
              messageBox({   //跳出弹窗
                  title: '定位',
                  content: name,
                  cancel: '取消',
                  ok: '切换定位',
                  /* handleCancel(){ 
                      console.log("1") 
                  }, */
                  handleOk(){
                      // console.log("2")
                      window.localStorage.setItem('nowNm',name)
                      window.localStorage.setItem('nowId',id) //保存到本地 
                      window.location.reload()  //切换城市后页面重新加载
                  }
              })
            }  
        })
     },3000)
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
      window.localStorage.setItem('nowNm',item.name); //这个是为了防止刷新后 地名又变为默认设置的地名。可以到状态管理去取出来 
      window.localStorage.setItem('nowId',item.cityId);  
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