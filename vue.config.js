const { name } = require('./package.json')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const publicPath = process.env.NODE_ENV === 'production' ? 'https://zhima-bus.site.youdao.com/' : `http://localhost:8000`;
module.exports = {
  publicPath: '/subapp/bus',
  transpileDependencies: ['common'],
  css:{
    loaderOptions: {
      less: {
        lessOptions: {javascriptEnabled: true}
      }
    }
  },
  // less 全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
      	// 注意路径，不能使用配置中的别名路径（例如：alias 配置下的路径别名）
        // path.resolve(__dirname, 'src/index.less'), 
        // path.resolve(__dirname, 'src/index_white.less'),
      ]
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    //将 font文件 编译成 base64 内嵌到css文件
    config.module
      .rule("fonts")
      .test(/\.(ttf|otf|eot|woff|woff2)$/)
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options = {
          // limit: 10000,
          name: "fonts/[name].[ext]",
        };
        return options;
      })
    
    // 原有的svg图像处理loader添加exclude
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    // 添加新的svg-sprite-loader处理svgIcon
    config.module
      .rule('svgIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
      
    //图片打包
    config.module
    .rule("images")
    .test(/\.(png|jpe?g|gif|webp)$/)
    .use("url-loader")
    .loader("url-loader")
    .tap((options) => {
      options = {
        // limit: 4096,
        name: "img/[name].[hash:7].[ext]",
        publicPath:'/assets'
      };
      return options;
    })
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: 'bus',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_n${name}`
    }
  },
  devServer: {
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://dns.devops.yd.netease.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/auth': {
        target: 'https://ids.corp.youdao.com',
        logLevel: 'debug',
        changeOrigin: true
      }
    }
  }
}
