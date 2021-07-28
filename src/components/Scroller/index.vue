<template> <!--封装better-scroll组件-->
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props : {   //在父组件只要发生滚动操作就会调用这里的滚动事件
        handleToScroll : { //滚动事件
            type : Function,
            default : function(){}
        },
        handleToTouchEnd : { //滚动结束后的事件
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var scroll = new BScroll( this.$refs.wrapper , {
            tap : true,   //开启tap点击事件
            probeType: 1  //开启截流
        });

        this.scroll = scroll;

        scroll.on('scroll',(pos)=>{ 
            this.handleToScroll(pos); //滚动事件
        });

        scroll.on('touchEnd',(pos)=>{ //滚动结束后的事件
            this.handleToTouchEnd(pos);
        });
    },
    methods : {
        toScrollTop(y){ // 这个方法是管理城市列表当点击字母索引时跳转到对应的地址
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>
