var path = require('path');

const proxy = require('./local_config');
/*
**  e.g
**  ./config 目录下新建一个local_config.js
**
    module.exports = {
        host: 'test.scm.admin.teadmin.net',
        serTarget: 'https://test-scm.trendy-global.com',
        logTarget: 'https://login.trendy-global.com'
    }
*/

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,//和源码映射，出错时会定义出错位置
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    host: proxy.host,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    env: require('./dev.env'),
    port: 3000,

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/TrendyScm-rest/rest': {
        target: proxy.serTarget,
        changeOrigin: true,
        pathRewrite: {
          '^/TrendyScm-rest/rest': '/TrendyScm-rest/rest/',
        },
      },
      '/Logon': {
        target: proxy.logTarget,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        pathRewrite: {
          '^/Logon.do': '/Logon.do',
        },
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
};
