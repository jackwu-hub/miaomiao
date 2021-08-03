module.exports={
    publicPath: '/miaomiao',
    devServer: {
        proxy: {
            '/api2' : {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
    
}