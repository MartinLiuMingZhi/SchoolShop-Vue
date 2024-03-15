const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8800, // 启动端口号
    open:false, // 启动后是否自动打开网页
    // proxy:{
    //   "/api":{
    //     target:"http://47.120.37.156:8080",
    //     changeOrigin:true,
    //     ws: true,
    //     pathRewrite: { // 重写地址 你的接口地址是'http://10.10.1.10/login' 你请求得时候地址只需要写'/api/login'
    //       '^/api': ''
    //     },
    //   }
    // }
  }
})
