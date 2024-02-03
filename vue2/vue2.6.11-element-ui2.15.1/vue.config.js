// const webpack = require('webpack');

module.exports = {

  // 部署应用包时的基本 URL
  // publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',

  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',

  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,

  // 是否使用包含运行时编译器,
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  // 更多细节可查阅：Runtime + Compiler vs. Runtime only
  runtimeCompiler: true,

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: true,

  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 开发环境下是 false 生产环境下是true,
    // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
    // 然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
    extract: false,

    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,

    // css预设器配置项
    // 支持的 loader 有： css-loader postcss-loader sass-loader less-loader stylus-loader
    loaderOptions: {

    },

    // 可以使用 scss 选项，针对 scss 语法进行单独配置（区别于 sass 语法）
  },

  // // webpack-dev-server 相关配置
  // 有些值像 host、port 和 https 可能会被命令行参数覆写。
  devServer: {
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true, // 热加载
    // host: '0.0.0.0', // ip地址
    // port: 8085, // 端口
    // https: false, // false关闭https，true为开启
    open: true, // 自动打开浏览器

    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
    // 这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    proxy: {
      '/api': { // 本地
        target: '<url>',
        // 如果要代理 websockets
        ws: true,
        changeOrigin: true,
      },
      '/test': { // 测试
        target: '<url>',
      },
      '/pre': { // 预发布
        target: '<url>',
      },
      '/pro': { // 正式
        target: '<url>',
      },
    },
  },

  // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: { // 第三方插件配置
    // ...
  },

  //
};
