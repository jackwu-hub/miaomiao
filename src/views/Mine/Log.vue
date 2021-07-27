<template>
   <div class="log">
     <img src="/img/download.png" alt="">
     <div class="bg">
        <div class="reg">
            <div class="regtwo">
                <input type="text" class="phone" name="" id="" placeholder="手机号">
                <input type="password" class="passone" name="" id="" placeholder="验证码">
                <input class="btn" type="button" value="立即登录" @click="handleClick()">
             </div>
        </div>
    </div>
   </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      localStorage.setItem('token', JSON.stringify({ isLogin: true }))
      this.$router.push('/center')
    }
  }
}
</script>

<style lang="scss" scope>
    .log{
      img{
        width: 60px;
        margin: 80px;
        margin-left: 50%;
        transform : translate(-50%);
      }
    }
   .reg{
        width: 360px;
        text-align: center;
        margin-bottom: 100px;
         .regtwo{
            text-align: center;
            input{
                width: 300px;
                height: 30px;
                margin-bottom: 30px;
                color: #666;
                -web-kit-appearance:none;
                -moz-appearance: none;
                font-size: inherit;
                font-family: inherit;
                background-color: transparent;
                border: 1px solid transparent;
                border-bottom-color: rgb(231, 227, 227);
            }
            input:focus{outline:none;}
            .btn{
                background-color: #FF5F16;
                color: #fff;
                height: 45px;
                margin-top: 30px;
                border-radius: 10px;
            }

        }
    }
</style>
