module.exports={
    publicPath: '/miaomiao',
    devServer: {
        proxy: {
            '/api2' : {
                target: 'http://47.98.188.149:3000',
                changeOrigin: true
            }
        }
    }
    
}