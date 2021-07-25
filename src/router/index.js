import Vue from 'vue'
import VueRouter from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine' 
Vue.use(VueRouter)

const routes = [
  movieRouter,
  cinemaRouter,
  mineRouter,
  {
    path: '*', //一级路由的默认页面
    redirect: '/movie'
  },
  {
    path: '/detail/:id', //动态路由
    name: 'kerwin',
    component: ()=>import('@/views/Movie/Detail')      
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, //这个默认值为 /
  routes
})

export default router
