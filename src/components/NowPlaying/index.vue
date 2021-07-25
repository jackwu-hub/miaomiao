<template> <!--正在热映 -->
        <ul>
            <li v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src='data.poster' />
                <div style="width: 50%;float:left;">
                    <h3>{{data.name}}</h3>
                    <p>观众评分<span style="color: #ff8040; font-weight: bold;">{{data.grade}}</span></p>
                    <p v-if="data.actors">主演:{{data.actors | actorfilter}}</p> <!--使用过滤器-->
                    <p v-else>暂无主演</p>
                </div>
                <span class="btn">购票</span>
            </li>
        </ul>
</template>
    
<script>
import axios from 'axios'
import Vue from 'vue'

/* Vue.filter('actorfilter',function(data){
    var newlist=data.map(item=>item.name) //通过map取它的name键
    return newlist.join(' ') //返个数组转换成字符串
}) */

export default {
    data() {
        return {
            datalist: []
        }
    },
    mounted() {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=511900&pageNum=1&pageSize=10&type=1&k=4914599',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"511900"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res=>{
            console.log(res.data)
            this.datalist=res.data.data.films
        })
    },
    methods: {
        handleChangePage(id){ //使用动态路由  进入电影详情页
            this.$router.push({ name: 'kerwin', params: { id: id } })
        }
    },
    filters: {
        actorfilter: function(data){
            var newlist=data.map(item=>item.name) //通过map取它的name键
            return newlist.join(' ') //返个数组转换成字符串
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
                background-color: #fa4040;
                border-radius: 5px;
                padding: 8px;
                color: white;
            }
        }
    }
</style>