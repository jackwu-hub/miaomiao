export default {
    path: '/movie',
    component: ()=>import('@/views/Movie'),  //使用的是按需加载路由
    children: [
        {
            path: 'nowPlaying',   //在二级路由中要么 /movie/nowPlaying  要么直接 nowPlaying
            name: 'nowPlaying',
            component: ()=>import('@/views/Movie/NowPlaying'),
        },
        {
            path: 'comingSoon',
            component: ()=>import('@/views/Movie/ComingSoon')
        },
        {
            path: 'search',
            component: ()=>import('@/views/Movie/Search')
        },
        {
            path: '', // 二级路由默认的页面
            redirect: '/movie/nowPlaying'
        }
    ]
}