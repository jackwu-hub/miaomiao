export default {
    path: '/admin',
    name: 'admin',
    component: ()=>import('@/views/Admin'),
    children: [
        {
            path: 'users',
            name: 'users',
            component: ()=>import('@/views/Admin/users')
        },
        {
            path: 'movie',
            name: 'movie',
            component: ()=>import('@/views/Admin/movie')
        },
        {
            path: 'cinema',
            name: 'cinema',
            component: ()=>import('@/views/Admin/cinema')
        },
        {
            path: '/admin',
            redirect: {
                name: 'users'
            }
        }
    ]
}