<template> <!-- 这里面的 title content  cancel ok都是取的调用这个组件中的定义好的值-->
    <div class="messageBox">
        <h2>{{title}}</h2>
        <p>{{content}}</p>
        <div>
            <div v-if='cancel' @click="handleCancel">{{cancel}}</div> 
            <div v-if='ok' @click="handleOk">{{ok}}</div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: "MessageBox"
}
    
</script>
<style lang='scss' scoped>
    .messageBox{
        width: 200px; height: 120px;border: 1px sloid #ccc; position: absolute; left: 50%; top: 50%; margin: -60px 0 0 -100px;
        border-radius: 4px; background: white; box-shadow: 1.5px 1.5px 1.5px 1.5px #ccc;
        h2{
            text-align: center; line-height: 40px; font-size: 18px;
        }
        p{
            text-align: center; line-height: 40px; 
        }
        > div{
            display: flex; position: absolute; bottom: 0; width: 100%;border-top:1px #ccc solid;height: 30px;line-height: 30px;
            div{
                flex: 1;text-align: center; border-right: 1px #ccc solid;
        
            }
            :last-child{
                border-right: none;
            }
        }
    }
</style>