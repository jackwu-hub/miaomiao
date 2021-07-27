<template> <!--正在热映 -->
    <div class="movie_body" style="padding-bottom: 50px;"> <!--这个padding-bottom 是解决因底部导航固定而显示不全的问题-->
        <ul >
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
    </div>
</template>
    
<script>


export default {
    name: 'NowPlaying',
    data() {
        return {
            movielist: []
        }
    },
    mounted() {
        this.axios({
            url: 'https://m.maizuo.com/gateway?cityId=511900&pageNum=1&pageSize=10&type=1&k=4914599',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"511900"}',
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
    methods: {
        handleChangePage(id){ //使用动态路由  进入电影详情页
            // 会把这个id值传给 路由中定义的 :id
            // this.$router.push(`/detail/${id}`) 如果方法
            this.$router.push({ name: 'moviedetail', params: { id: id } })
        }
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