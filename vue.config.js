const { name } = require('./package.json')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

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
