<template>
  <div><!--这里不要加 <keep-alive>,否则电影详情面会出问题 -->
     <!--一级路由渲染的位置-->
    <transition name="app" mode="out-in"> <!--out-in指的是过渡方向 name指的是样式名以app开头-->
        <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
  *{
    margin:0;
    padding: 0;
  }
  ul{
    list-style:none;
  }
  .app-enter-active {
    animation: aaa .5s;
  }
  .app-leave-active {
    animation: aaa .5s reverse;
  }
  @keyframes aaa {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
</style>