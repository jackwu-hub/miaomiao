<template>
    <div style="display: flex">
        <div style="flex-direction: column; ">
        <input type="text" placeholder="账户名/手机号/Email" />
        <input type="password" placeholder="请输入密码" />
        <input type="submit" value="登录" />
        <span>立即注册</span>
        <span style="float: right;">找回密码</span>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'Login'
}
    
</script>
<style lang='scss' scoped>
    input{
        width: 100%;
        height: 40px;
        outline: none;
    }
</style>