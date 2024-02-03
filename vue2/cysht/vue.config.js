const { defineConfig } = require('@vue/cli-service')
const path = require('path')

// 工具函数，添加绝对路径
// dir: "./src/components"   ---- "E:/share/myapp/src/components"
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true, // 配置自动启动浏览器
    proxy: {
        '/api': {
            target: `http://localhost:5000/`, //访问的服务器地址
            changeOrigin: true,
            ws: true, //启用websocket
            pathRewrite: {
                '^/api': ''  //替换规则
            }
        },
    }
},
   //设置路径别名
   chainWebpack(config) {
    config.resolve.alias
        //用com这个别名代表./src/components的完整路径
        .set('com', resolve('./src/components'))
}
})
