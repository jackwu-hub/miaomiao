<template>
        <ul> <!--声明式导航 一级路由，是跳转到App.vue页面去的-->
            <router-link to="/movie" tag="li" activeClass="myactive">
            <i class="iconfont icon-color"></i>电影</router-link>
            <router-link to="/cinema" tag="li" activeClass="myactive">
            <i class="iconfont icon-training"></i>影院</router-link>
            <router-link to="/mine" tag="li" activeClass="myactive">
            <i class="iconfont icon-account"></i>我的</router-link>
        </ul>
</template>
    
<script>
export default {
    name: 'TabBar'
}
    
</script>
<style lang='scss' scoped>
        .myactive{
            color: red;
        }
        ul{
            position: fixed;
            display: flex;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: white;
            border: 1px solid #b6b5b5;
            li{
                flex: 1;
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                i{margin-right: 5px;}
            }
        }
   
</style>