<template>
  <div class="myself">
    <div class="bg">
        <img src="" alt="">
        <p @click="handleLog()">立即登录</p>
    </div>
    <ul class="films">
        <li>
            <i class="icon iconfont icon-form"></i>
            <p>电影订单</p>
        </li>
        <li>
            <i class="icon iconfont icon-copy"></i>
            <p>商品订单</p>
        </li>
    </ul>

    <list></list>

  </div>

</template>

<script>
import list from '@/views/Mine/List'
export default {
  components: {
    list
  },
  methods: {
    handleLog () {
      this.$router.push('/mine/log')
    }
  },
  // 路由的钩子函数
  beforeRouteEnter (to, from, next) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      console.log('重定向，回到log页面')
      next('/mine/log')
    }
  }
}
</script>

<style lang="scss" scoped>
    .myself{
        background-color: #F4F4F4;
        .bg{
        width: 100%;
        height: 160px;
        background: url('/img/banner.png');
        background-position: center center;
        background-size: cover;
            img{
                width: 65px;
                height: 65px;
                border-radius: 50%;
                float: left;
                margin-top: 60px;
                margin-left: 30px;
                background-color: #fff;
            }
            p{
                line-height: 60px;
                float: left;
                color: #fff;
                margin-top: 60px;
                margin-left: 30px;
            }
        }
        .films{
            height: 100px;
            display: flex;
            justify-content:space-around;
            margin-bottom: 16px;
            background-color: #fff;
            li{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #999;
                font-size: 13px;
                i{
                    font-size: 25px;
                    padding-bottom: 6px;
                }
                .icon-form{
                    color:orange;
                }
                .icon-copy{
                    color: #C6DA5F;
                }
            }
        }
     }
</style>
