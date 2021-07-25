<template>
    <header id="header">
        <h1>{{title}}</h1>
    </header>
</template>
    
<script>
export default {
    name: 'Header', //这个名字在devtool工具中可以看到，方便调试
    props: { //这样就可以从父组件传过来值，可以动态更改title
        title: {
            type: String,
            default: "喵喵电影"
        }
    }
}
    
</script>
<style lang='scss' scoped>
    #header{
        background-color: red;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 10px;
        color: white;
    }
</style>