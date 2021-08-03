export default {
    path: '/mine',
    component: ()=>import("@/views/Mine"),
    children: [
        {
            path: 'center',
            name: 'center',
            component: ()=>import("@/views/Mine/center")
        },
        {
            path: 'login',
            name: 'login',
            component: ()=>import("@/components/Login")
        },
        {
            path: 'register',
            name: 'register',
            component: ()=>import("@/components/Register")
        },
        {
            path: 'findPassword',
            name: 'findPassword',
            component: ()=>import("@/components/FindPassword")
        },
        {
            path: '/mine', //默认页面
            redirect: {
                name: 'center'
            }
        }
    ]
    
}