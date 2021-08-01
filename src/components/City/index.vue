<template>  <!--这个页面没有作用，主要是为了学习它是怎么取数据的-->
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.cityId" @tap="handleToCity(item.name , item.cityId)">{{ item.name }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="itemList in item.list" :key="itemList.cityId" @tap="handleToCity(itemList.name , itemList.cityId)">{{ itemList.name }}</li>
                            </ul>
                        </div>	
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
            </ul>
        </div>
    </div>
</template>
    
<script>
export default {
    name: "City",
    data() {
        return {
            cityList: [],
            hotList: [],
            isLoading: true
        }
    },
    
    mounted() {
        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList); //把json数据转换成原生javascript对象
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else{
            this.axios({ //
                url: 'https://m.maizuo.com/gateway?k=9548036',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16266978925309722039156737","bc":"110100"}',
                    'X-Host': 'mall.film-ticket.city.list'
                }
            }).then(res => {
                 // {index: "索引字符", list: [{cityId: 1,name: "北京",}]}
                if(res.data.msg==='ok'){
                    this.isLoading=false;
                    var cities = res.data.data.cities
                    console.log(cities)
                    var{cityList,hostList}=this.formatCityList(cities) //通过解构获取函数返回值
                    this.cityList=cityList
                    this.hotList=hostList
                    window.localStorage.setItem('cityList' , JSON.stringify(cityList)) //把原生javascript序列化为json类型
                    window.localStorage.setItem('hotList' , JSON.stringify(hotList))
                }
            })
        }
    },
    methods: {
        formatCityList(cities){ //二次加工
            var citylist=[]
            var hostlist=[]

            for(var i=0;i<cities.length;i++){  //这是处理hotlist
                if(cities[i].isHot===1){
                    hostlist.push(cities[i])
                }
            }

            for(var i=0;i<cities.length;i++){  //这是处理citylist 把读取来的数据进行改造（加上字母索引）
                var firstletter=cities[i].pinyin.substring(0,1).toUpperCase() //过滤出pinyin的首字母
                if(toCom(firstletter)){ //如果没有就新建带字母索引的 对象
                    citylist.push(
                        {
                            index: firstletter,
                            list: [{
                                    name: cities[i].name,
                                    cityId: cities[i].cityId,
                                    isHot: cities[i].isHot
                                }]
                        }
                    )
                }else{ //如果该字母已经建立索引就累加到已有这个索引下
                    for(var j=0;j<citylist.length;j++){
                        if(citylist[j].index===firstletter){
                            citylist[j].list.push(
                                {
                                    name: cities[i].name,
                                    cityId: cities[i].cityId,
                                    isHot: cities[i].isHot
                                }
                            )
                        }
                    }
                }
            }

            citylist.sort((n1,n2)=>{ //按照字母顺序排序
                if(n1.index>n2.index){
                    return 1
                }else if(n1.index<n2.index){
                    return -1
                }else {
                    return 0
                }
            })
            function toCom(firstletter){
                for(var i=0;i<citylist.length;i++){
                    if(citylist[i].index===firstletter){  //如果有索引就不新建
                        return false
                    }
                }
                return true
            }
            console.log(citylist)
            return {
                citylist,
                hostlist
            }
        },
        handleToIndex(index){ //这个是处理当点击字母索引时跳转到对应的位置
            var h2=this.$refs.city_sort.getElementsByTagName('h2')
            this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop
        }
    }
    
}
    
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>