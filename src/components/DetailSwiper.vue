<template>
    <div class="swiper-container a">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>

        <!--如果需要分页器-->
        <div class="swiper-pagination"></div>

    </div>
</template>
    
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    props: ['perview','myclassname'],
    mounted() {
        new Swiper('.'+this.myclassname,{
            slidesPerView: this.perview, //代表显示几张图
            spaceBetween: this.myclassname === 'actorswiper' ? 20: 10,
            freeMode: true
        })
    },
    
}
    
</script>
<style lang='scss' scoped>
    .swiper-wrapper{
        img{
            width: 100%;
        }
    }
</style>