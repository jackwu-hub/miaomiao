<template>
    <div class="swiper-container a">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination move-swiper-pagination "></div>
          <!--  如果需要导航按钮
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->

    </div>
</template>

<script>

import Swiper from 'swiper' // 这是引入 js
import 'swiper/dist/css/swiper.min.css' // 这是引入
/* Vue.use(Swiper) // 要先注册，才能new */
export default {
  mounted () { // 还是子组件内的 mounted先出来 ，然后才是root组件
  /* eslint-disable no-new */  //这个是如果在eslint模式下，因为使用new 之前要先向Vue注册，所以关闭eslint检查
    new Swiper('.a', {
      // direction: 'vertical'
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
      /* navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      } */
    })
  }
}
</script>

<style lang="scss" scoped>
    .swiper-wrapper{
        img{
            width: 100%;
        }
    }
     .move-swiper-pagination{
        text-align: right;
      }
      
</style>
