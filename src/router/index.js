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
    name: 'moviedetail',
    component: ()=>import('@/views/Movie/Detail')      
  },
  {
    path: '/:path',
    //name: 'city',
    component: ()=>import('@/views/Cinema/City')
  },
  {
    path: '/cinema/search', //动态路由
    //name: 'cinema/search',
    component: ()=>import('@/views/Cinema/Search')
  },
  {
    path: '/mine/log', //动态路由
    component: ()=>import('@/views/Mine/Log')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, //这个默认值为 /
  routes
})

export default router
