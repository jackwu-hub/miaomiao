<template>
    <div>
        <swiper :key="looplist.length" ref="myswiper"> <!--当有多个swiper时，如果不加key,它就不会创建，而是替换（diff算法),所以又是swiper初始化过早的问题 会造成轮播图换不了图 ref是拿到这个轮播图dom结构-->
            <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
                <img :src="data.imgUrl" />
            </div>
        </swiper>
        <monav :class="isFixed?'fixed':''"/> <!-- 这个fixed是类名，如果满足条件class='fixed',否则为空,这是做吸顶效果的 -->
            <router-view /> <!--二级路由渲染的位置-->
        <tabBar v-show="isTabbarShow"/> <!--使用计算属性 当进入电影详情页时底部导航要隐藏-->
    </div>
</template>
    
<script>
import swiper from '@/components/Swiper'
import tabBar from '@/components/TabBar'
import monav from './nav.vue'
import axios from 'axios'
import {mapState} from 'vuex' /* ES6新的导出方式 */
export default {
    name: 'Movie',
    components:{
        swiper,
        tabBar,
        monav
    },
    data() {
        return {
            isFixed: false,
            looplist: []
        }
    },
    computed: {
        ...mapState(['isTabbarShow']) /* ...是ES6中展开合并运算符， */
    },
    mounted() {
        axios({
            url: 'https://m.maizuo.com/gateway?type=2&cityId=511900&k=3847221',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"511900"}',
                'X-Host': 'mall.cfg.common-banner'
            }
            }).then(res => {
            console.log(res.data)
            this.looplist = res.data.data
            })

        window.onscroll = this.handleScroll // 这个是处理吸顶效果的 在挂载的时候就开始监听滚动条事件，所以把它放到mounted
    },
    beforeDestroy () { /* 这个生命周期是在结束前触发,因为上面的 window.onscroll这个事件在其他页面上也会存在，所以在离开这个页面时要把它置为空 */
        window.onscroll = null // 这样这个监听事件只在当前页面有效
    },
    methods: {
    handleScroll () { // 做出吸顶的效果
        console.log("aaaaa")
        console.log(this.$refs.myswiper)
      /* console.log(document.documentElement.scrollTop,this.$refs.myswiper.$el.offsetHeight)  */ // 离顶部滚动的距离,轮播图的高度,这样获取是非常好的，因为它是兼容所有设备的，
      if (document.documentElement.scrollTop >= this.$refs.myswiper.$el.offsetHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  }
}
    
</script>
<style lang='scss'>
    
</style>