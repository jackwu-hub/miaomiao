<template>
    <div>
        <div>个人中心：</div>
        <div>当前用户：{{ $store.state.user.name }} <a href="javascript:;" @click="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/miaomiao/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>                        <!--这里不知道为什么在把它部署到服务器后，如果前面不加上/miaomiao，它跳转不了  在本地没有问题 -->
        <div>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
    name : 'center',
    methods : {
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res)=>{
                var status = res.data.status;
                if(status === 0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{ name : '' , isAdmin : false , userHead : '' });
                    this.$router.push('/mine/login');
                }
            });
        },
        handleToUpload(ev){
            var file = ev.target.files[0]; //这个是获取 input="file"这个dom结构 
            var param = new FormData(); //这个FormData可以把这个文件存储起来，传输给后台
            param.append('file' , file , file.name); //第三个参数代表这个文件dom的 name属性
            var config = {   //这是expressmiddle的  multer规定的，要注明内容类型
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            };

            this.axios.post('/api2/users/uploadUserHead',param , config).then((res)=>{
                var status = res.data.status;
                var This = this; //this 表示当前执行的对象，如果有对象的嵌套，则this的值会随对象的改变而改变，为了保留原有的对象，所以
                if( status === 0 ){
                    messageBox({
                        title : '信息',
                        content : '上传头像成功',
                        ok : '确定',
                        handleOk(){
                            This.$store.commit('user/USER_NAME',{ 
                                name : This.$store.state.user.name , 
                                isAdmin : This.$store.state.user.isAdmin ,
                                userHead : res.data.data.userHead + '?' + Math.random() //这里加随机数的原因是因为有时候有缓存 ，图片得不到更新。
                            });
                        }
                    });
                }
                else{
                    messageBox({
                        title : '信息',
                        content : '上传头像失败',
                        ok : '确定'
                    });
                }
            });

        }
    },
    beforeRouteEnter (to, from, next) {  //局部拦截 路由守卫  ,没有登陆信息就会跳转到 登陆页面去 这个是防止通过点击链接进入管理员几百页 
        axios.get('/api2/users/getUser').then((res)=>{
            var status = res.data.status;
            if(status === 0){  //如果已经登陆，就把登陆信息保存到本地存储 和状态管理
                next(vm => {  //通过回调函数获取登陆信息
                    localStorage.setItem('name',res.data.data.username); //保存到本地是为了 当进入管理页面时的方式是通过 直接输入url，而不是跳转时，
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{ 
                        name : res.data.data.username , 
                        isAdmin : res.data.data.isAdmin ,
                        userHead : res.data.data.userHead
                    });
                });
            }
            else{
                next('/mine/login');
            }
        });
    }
}
</script>

<style scoped>
.userHead{ width:100px; height:100px; border-radius: 50%; overflow: hidden;}
</style>
