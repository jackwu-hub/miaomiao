<template> <!--正在热映 -->
    <div class="movie_body" style="padding-bottom: 50px;"> <!--这个padding-bottom 是解决因底部导航固定而显示不全的问题-->
      <!--  <Scroller> 这个组件是better-scroll  因为我的这个外容器和内容器一样大，所以这里用不了better-scroll-->
            <ul>
               <!--  <li class="pullDown">{{pullDownMsg}}</li> -->
                <li v-for="item in movielist" :key="item.filmId" @click="handleChangePage(item.filmId)">
                    <div class="pic_show"><img :src='item.poster' /></div>
                    <div class="info_list">
                        <h2>{{item.name}} <img v-if="item.filmType.name==='3D'" src="@/assets/maxs.png" alt=""></h2>
                        <p>观众评分<span class="grade">{{item.grade}}</span></p>
                        <p v-if="item.actors">主演:{{item.actors | actorfilter}}</p> <!--使用过滤器-->
                        <p v-else>暂无主演</p>
                        <p>{{item.nation}} | {{item.runtime}}分钟</p>
                    </div>
                    <div class="btn_mall">购票</div>
                </li>
            </ul>
       <!--  </Scroller> -->
       
    </div>
</template>
    
<script>
import { mapState} from 'vuex' // mapState 是vuex提供的切割函数
export default {
    name: 'NowPlaying',
    data() {
        return {
            movielist: [],
            /* pullDownMsg: '', */
        }
    },
    components: {
         
    },
    mounted() {
        console.log("触发几次") //这里因为没有使用缓存，所以每次进到这个页面都会触发，如果使用了vuex 缓存，那么它只会触发一次，这里不知道为什么这个结论不对
        this.axios({
            url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4914599`,
            headers: {
                'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"${this.cityId}"}`,
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            var msg=res.data.msg
            //console.log(res.data)
            if(msg==='ok'){
                this.movielist=res.data.data.films
            }
            
        })
    },
    computed: {
         ...mapState('city', ['cityId'])  //获取全局变量cityId的值
    },
    methods: {
        handleChangePage(id){ //使用动态路由  进入电影详情页
            // 会把这个id值传给 路由中定义的 :id
            // this.$router.push(`/detail/${id}`) 第一种方法
            this.$router.push({ name: 'moviedetail', params: { id: id } }) //第二种方法
        },
         //因为我的这个外容器和内容器一样大，所以这里用不了better-scroll-
        /* handleToScroll(pos){ //这个方法是 Scroller中定义的 调用它的滚动事件 
            if(pos.y>100){
                console.log("正在更新")
                this.pullDownMsg='正在更新中'
            }
        },
        handleToTouchEnd(pos){ 
            if( pos.y > 30 ){
                this.axios({
                    url: 'https://m.maizuo.com/gateway?cityId=511900&pageNum=1&pageSize=10&type=1&k=4914599',
                    headers: {
                        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"511900"}',
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                }).then(res=>{
                    var msg = res.data.msg;
                    if( msg === 'ok' ){
                        this.pullDownMsg = '更新成功';
                        setTimeout(()=>{
                            this.movieList = res.data.data.movieList;
                            this.pullDownMsg = '';
                        },1000);
                        
                    }
                });
            }
        } */
    },
    
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
        .grade{
            font-weight: 700; color: #faaf00; font-size: 15px;
        }
        img{
            width:50px; position: absolute; right:10px; top: 5px;
        }
    }
    .btn_mall, .movie_body .btn_pre{
        width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;
    }
    .btn_pre{
        background-color: #3c9fe6;
    }
    .pullDown{
        margin:0; padding:0; border:none;
    }
    
}
</style>