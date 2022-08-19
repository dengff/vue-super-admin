'use strict';
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');
const path = require('path');
var config = require('../config');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // css-minimizer-webpack-plugin css压缩
const BundleAnalyzerPlugin = require(
  'webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const proConfig = merge(baseConfig, {
  mode: 'production',
  watch: false,
  optimization: {
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // cache: true,
        // compress: {
        // 	// warnings: false,
        // 	// drop_console: true,
        // 	drop_debugger: true,
        // },
        parallel: 4,
        // extractComments: false,
        minify: TerserPlugin.esbuildMinify,
      }),
      new CssMinimizerPlugin({
        parallel: 4,
        minify: CssMinimizerPlugin.esbuildMinify,
      }),
    ],
    splitChunks: {
      // name: false,
      chunks: 'all',
      maxInitialRequests: 5,
      maxAsyncRequests: 10,
      // minChunks: 1,
      // minSize: 30000,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          name: 'vendors-chunk',
          chunks: 'initial',
        },
        // srcPagesChunk: {
        // 	name: 'srcPagesChunk',
        // 	test: utils.resolve('src/pages'),
        // 	priority: 5,
        // 	chunks: 'initial'
        // },
        // storeChunk: {
        // 	chunks: 'all',
        // 	name: `store.[chunkhash]`,
        // 	test: /[\\/]store[\\/]/,
        // 	priority: 11,
        // },
        // componentChunk:{
        // 	chunks: 'all',
        // 	name: `componentChunk`,
        // 	test: /[\\/]components[\\/]/,
        // 	priority: 20,
        // 	maxSize: 102400
        // },
        echartsChunk: {
          // chunks: 'all',
          name: `echartsChunk`,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/,
          priority: 12,
          chunks: 'async',
          // minSize: 30000,
          // reuseExistingChunk:true
          // maxSize: 36000
        },

        elementUIChunk: {
          chunks: 'all',
          name: `element-uiChunk`,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          priority: 30,
          // minSize:15360
          // minChunks: 3
          // minSize: 15360,
          // reuseExistingChunk:true
        },
        // html2canvasChunk: {
        // 	chunks: 'async',
        // 	name: `html2canvasChunk`,
        // 	test:  /[\\/]node_modules[\\/]_?html2canvas(.*)/,
        // 	priority: 30,
        // 	// minSize:15360
        // },

        pagesComponentsChunk: {
          chunks: 'async',
          name: 'pagesComponentsChunk',
          test: utils.resolve('src/pages/components'),
          priority: 30,
        },
        storeChunk: {
          chunks: 'all',
          name: 'storeChunk',
          test: utils.resolve('src/store'),
          priority: 30,
          // minSize: 15360,
          // chunks: 'async' reuseExistingChunk
        },
        componentsPrintChunk: {
          chunks: 'all',
          name: 'componentsPrintChunk',
          test: utils.resolve('src/pages/components/Print'),
          priority: 20,
        },
        stylesChunk: {
          name: 'stylesChunk',
          test: `/\.css$/`,
          chunks: 'all',
          priority: 30,
          // enforce: true,
        },
        commonChunk: {
          chunks: 'async',
          name: 'commonChunk',
          test: utils.resolve('src/components'),
          priority: 20,
          // reuseExistingChunk:true
        },

      },
    },
  },
  devtool: false,
  // devtool: 'eval',
  // devtool: 'hidden-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css',
      chunkFilename: 'static/css/[id].[contenthash].css',
      ignoreOrder: true,
    }),
    // new OptimizeCssPlugin ({
    // 	cssProcessorOptions: {
    // 		// 避免 cssnano 重新计算 z-index
    // 		safe: true
    // 	}
    // }),

    new webpack.DefinePlugin({
      'process.env': config.build.env,
    }),
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$',
      ),
      threshold: 10240,
      minRatio: 0.8,
      // deleteOriginalAssets: true // 删除源文件
    }),
    new BundleAnalyzerPlugin(),
    // new SpeedMeasurePlugin(),

  ],
});
console.log(process.env.NODE_ENV, 'proConfig');
module.exports = proConfig;
