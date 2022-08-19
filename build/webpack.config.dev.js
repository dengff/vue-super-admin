'use strict';

const webpack = require('webpack');
const {merge} = require('webpack-merge');
// const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');
const path = require('path');
const config = require('../config');
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const HOST = 'localhost';
const PORT = 8082;

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: '**/node_modules',
  },
  devServer: {
    hot: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // quiet: true,
    port: PORT,
    proxy: {
      '/api': {
        // 例如我们请求 http://localhost:8080/api/users 会被代理到 https://api.github.com/api/users
        // target: 'https://www.fastmock.site/mock/a073c1a206e2b18497c30f4926f8647d/api/',
        // target: 'https://test-scm.trendy-global.com',
        target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
        // 实际上我们的真正请求地址为 https://api.github.com/users 所有我们需要通过 pathRewrite 配置项进行重写路径
        pathRewrite: {'^/api': '/api/'},
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为。
        changeOrigin: true,
      },
      '/app-scm': {
        target: 'https://test-scm.trendy-global.com',
        changeOrigin: true,
        pathRewrite: {
          '^/app-scm': '/app-scm/',
        },
      },
      '/Logon': {
        target: 'https://login.trendy-global.com',
        pathRewrite: {
          '^/Logon.do': '/Logon.do',
        },
      },
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
    }),
    // new FriendlyErrorsWebpackPlugin(),
    // new SpeedMeasurePlugin(),
// 		new HardSourceWebpackPlugin(),
  ],
});
