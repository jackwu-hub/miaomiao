<template> <!--即将上映-->
    <div class="movie_body" style="padding-bottom: 50px;">
        <ul>
            <li v-for="data in this.$store.state.comingList" :key="data.filmId">
                <div class="pic_show"> <img :src='data.poster' /></div>
                <div class="info_list">
                    <h2>{{data.name}}<img v-if="data.filmType.name==='3D'" src="@/assets/maxs.png" alt=""></h2>
                    <p v-if="data.actors">主演:{{data.actors | actorfilter}}</p> <!--使用过滤器-->
                    <p v-else>暂无主演</p>
               </div>
                <div class="btn_mall">预售</div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
    name: 'ComingSoon',
    mounted () {
        /* 通过异步来缓存axios请求获取的数据 */
        if (this.comingList.length === 0) { /* 第二步在需要缓存的页面中去判断，这个数组中有没有数据 */
            //this.$store.dispatch('getComingListAction',this.$store.state.city.cityId).then(res=>{ //这样传参数报了http请求头信息异常，状态码1013，这个错误是说参数有错
            this.$store.dispatch('comingsoon/getComingListAction',this.cityId).then(res=>{
            console.log('异步结束，已经存到vuex')
        })} else { /* 如果没有缓存就转发到store目录下的index.js中的 Action去异步处理 getComingListAction是方法名 */
            console.log('使用缓存数据')
        }
    },
    computed: {
        ...mapState('comingsoon',['comingList']),
        ...mapState('city', ['cityId']),
    }
}
</script>
<style scoped lang="scss">
.movie_body{ 
    flex:1; overflow:auto;
    ul{ 
        margin:0 12px; overflow: hidden;
        li{
            margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;
        }
    }
    .pic_show{
        width:64px; height: 90px;
        img{
            width: 100%;
        }
    }
    .info_list{
        margin-left: 10px; flex:1; position: relative;
        h2{
            font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;
        }
        p{
            font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;
        }
        img{
            width:50px; position: absolute; right:10px; top: 5px;
        }
    }
    .btn_mall, .movie_body .btn_pre{
        width:47px; height:27px; line-height: 28px; text-align: center; background-color: #3c9fe6; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;
    }
    .btn_pre{
        background-color: #3c9fe6;
    }
    
}
</style>