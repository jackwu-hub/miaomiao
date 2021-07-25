<template> <!--即将上映-->
    <div>
        <ul>
            <li v-for="data in this.$store.state.comingList" :key="data.filmId">
                    <img :src='data.poster' />
                <div style="width: 50%; float: left;">
                    <h3>{{data.name}}</h3>
                    <p>观众评分{{data.grade}}</p>
                    <p v-if="data.actors">主演:{{data.actors | actorfilter}}</p> <!--使用过滤器-->
                    <p v-else>暂无主演</p>
               </div>
                <span class="btn">预售</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'

Vue.filter('actorfilter',function(data){
    var newlist=data.map(item=>item.name) //通过map取它的name键
    return newlist.join(' ') //返个数组转换成字符串
})
export default {
  mounted () {
    /* 通过异步来缓存axios请求获取的数据 */
    if (this.$store.state.comingList.length === 0) { /* 第二步在需要缓存的页面中去判断，这个数组中有没有数据 */
      this.$store.dispatch('getComingListAction') /* 如果没有缓存就转发到store目录下的index.js中的 Action去异步处理 getComingListAction是方法名 */
    } else {
      console.log('使用缓存数据')
    }
  }
}
</script>
<style lang='scss' scoped>
    ul{
        li{
            padding: 10px;
            overflow: hidden;

            img{
                float: left;
                width: 100px;
                margin-right: 10px;
            }
            .btn{
                display: inline-block;
                margin-top: 50px;
                margin-left: 10px;
                background-color: #4072fa;
                border-radius: 5px;
                padding: 8px;
                color: white;
            }
        }
    }
</style>
