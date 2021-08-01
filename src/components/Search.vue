<template>
    <div>
        <div class="header">
            <div class="left" @click="onHomeClick">
                <i class="iconfont icon-close" style="font-size: 22px"></i>
            </div>
            <div class="title">当前城市 - </div>
        </div>
        <div class="search-city-input">
            <div class="input-wrap"  :class="{onFocus: isFocus}"> <!--只要获得焦点这个类名就是onFocus -->
                <i class="iconfont icon-search"></i>
                <input 
                    type="text" 
                    placeholder="输入城市名或拼音" 
                    class="search-input"
                    @focus="showCancelBtn"
                    v-model="searchInput"
                    ref="searchInput"
                    @input="searchCity"
                >
                <div class="clean-icon" @click="cleanInput">
                    <i class="iconfont icon-wrong"  v-show="showCleanBtn"></i>
                </div>
            </div>
            <div v-if="isFocus" class="cancel-btn" @click="hideCancelBtn">取消</div>
        </div>
        
    </div>
</template>
<script>

export default {
    data(){
        return {
            isFocus: false,
            showCleanBtn: false,
            isShowSearchResult: false,
            searchInput: '',
        }
    },
    methods: {
        onHomeClick() {
            console.log(222)
            /* const id = cookie(CCONSTANT.COOKIE_CITY_ID)
            const name = cookie(CCONSTANT.COOKIE_CITY_NAME)
            if (!id || !name) {
                return MessageBox.alert('请选择一个城市')
            } */
            // 可以获取当前来源路由
            if (document.referrer.indexOf(window.location.origin) == 0) {
                // 同源跳转（代表是从页面跳转来的）
                return this.$router.go(-1)
                //return this.$router.back()
            } else {
                // 非同源跳转 (通过地址栏或者书签等打开的)
                return this.$router.push({ name: 'home' }) 
            }
            // if(this.fromRoute) {
            //   console.log(333)
            //   return this.$router.go(-1)
            // } else {
            //   window.history.back()
            // }
            // 首次进入web 或者刷新无法获取来源路由，匹配window.location.href来获取是否同源路由而重定向
            // if(this.fromHref.match(CCONSTANT.ORIGIN_HOST)) {
            // console.log(444)
            // return window.location.href = this.fromHref
            // }
            // 非同源路由默认返回首页
            // return this.$router.push({name: "home"})
        },
        searchCity(){
            this.showCleanBtn=this.searchInput==''?false:true
        },
        showCancelBtn(){ //当输入框有焦点时 
            this.isFocus=true     //
            this.showCleanBtn=this.searchInput==''?false:true
        },
        hideCancelBtn() {
            this.isFocus = false
            this.showCleanBtn = false
            this.isShowSearchResult = false
        },
        cleanInput(){
            this.searchInput=''
            this.showCleanBtn=false;
        },
    }
}
</script>

<style lang='scss' scoped>
        .header{
            position: fixed; top: 0;left: 0;width: 100%; height: 44px;line-height: 44px; overflow: hidden; 
            display: flex; justify-content: flex-start; //默认对齐
            
            .left{
                width: 14%;  //
                >i{
                    margin-left: 10px;
                }
            }
            .title{
                width: 72%; text-align: center; font-size: 17px;
            }
        }


        .search-city-input{
            height: 49px; width: 100vw;padding: 9.5px 15px; background-color: #f4f4f4; position: fixed; top: 44px;
            .input-wrap{
                position: relative; display: inline-block; border-radius: 3px; width:100%;height: 30px; line-height: 30px;background-color: white;
                .icon-search{
                    position: absolute;
                    left: 7px;
                    top: 0;
                    color: #797d82;
                }
                .search-input{
                    position: absolute;left: 33.5px;top: 0; height: 30px; border: 0; width: 237px; outline: none;border: none;
                }
                .clean-icon{
                    position: absolute; right: 7px; top: 0; font-size: 21px; color: #bdc0c5;
                }
            }
            .cancel-btn{
                width: 43px;
                position: absolute;display: inline-block; text-align: right; font-size: 14px;line-height: 30px;

            }   
            .onFocus{
                width: 302px;
            }
        }
    
    div{
        box-sizing: border-box; //这个一定要，当使用padding时，元素会被撑大，如果不想元素改变大小，可以使用 box-sizing: border-box
    }

</style>