<template>
  <div v-if="filminfo">  <!--如果filminfo有数据就渲染 因为axios是异步的，所以有时没有数据也会渲染，就会报name是null的错误-->
        <img :src="filminfo.poster" class="poster" />
        <h2>{{filminfo.name}}</h2>

        <h3>演职人员</h3>
        <swiper perview="4" class="actorswiper" myclassname="actorswiper"> <!-- perview是传给子组件显示图片的个数，但是因为页面有两个swiper，所以加上class属性,后面的myclassname也是传给子组件的，和perview一样，这样不用写死-->
          <div class="swiper-slide" v-for="data in filminfo.actors" :key="data.name">
            <img :src="data.avatarAddress" />
            <p>{{data.name}}</p>
          </div>
        </swiper>

        <h3>剧照</h3>
        <swiper perview="3" class="photoswiper" myclassname="photoswiper">
          <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index">
            <img :src="data" />
          </div>
        </swiper>
    </div>
</template>
  
<script>
import swiper from '@/components/DetailSwiper'
export default {
  data() {
    return {
      filminfo: null
    }
  },
  props: ['id'],
  beforeMount() {  //进入详情页前把底部导航隐藏
    this.$store.commit('HideMaizuoTabbar',false)
  },
  mounted() {
    this.id=this.$route.params.id
    this.axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=3389488`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res=>{
      
      this.filminfo=res.data.data.film
    })
  },
  beforeDestroy() {
    this.$store.commit('ShowMaizuoTabbar',true)
  },
  components: {
    swiper
  }
}
  
</script>
<style lang='scss' scoped>
    .poster{
        width: 100%
    }
</style>