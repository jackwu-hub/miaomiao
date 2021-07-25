<template>
        <ul> <!--声明式路由 二级路由 -->
            <li><span @click="showCity">定位</span><best-city ref="vuecity" @closeChooseCity="getCity"></best-city><i class="iconfont icon-moreunfold"></i></li>
            <router-link to="/movie/nowplaying" tag="li" activeClass="myactive">
            正在热映</router-link>
            <router-link to="/movie/comingSoon" tag="li" activeClass="myactive">
            即将上映</router-link>
            <router-link to="/movie/search" tag="li" activeClass="myactive">
            <i class="iconfont icon-search" style="color: red; font-weight: bold;"></i></router-link>
        </ul>
</template>

<script>
export default {
    name: 'movieNav',
    methods: {
    getCity(val) {
      console.log(val);
    },
    showCity() {
      this.$refs.vuecity.show();
    }
  }
}
    
</script>
<style lang='scss' scoped>
        .myactive{
            color: red;
            border-bottom: 2px solid red;
        }
        ul{
            width: 100%;
            background-color: white;
            display: flex;
            border: 1px solid #f0eded;
            height: 40px;
            li{
                
                flex: 1;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                i{
                    margin-right: 5px;
                }
            
            }
         }
         .fixed{    //这个是吸顶效果，只有滚动的高度>=轮播图的高度时这个类才会被创建
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            background-color: white;
         }
</style>