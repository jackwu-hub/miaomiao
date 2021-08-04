module.exports={
    publicPath: '/miaomiao',
    devServer: {    //反向代理  
        proxy: {
            '/api2' : {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
    
}