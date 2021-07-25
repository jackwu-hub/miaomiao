export default {
    path: '/movie',
    component: ()=>import('@/views/Movie'),  //使用的是按需加载路由
    children: [
        {
            path: 'nowPlaying',
            component: ()=>import('@/components/NowPlaying'),
        },
        {
            path: 'comingSoon',
            component: ()=>import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: ()=>import('@/components/Search')
        },
        {
            path: '', // 二级路由默认的页面
            redirect: '/movie/nowPlaying'
        }
    ]
}