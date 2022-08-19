const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueLoaderPlugin = require("vue-loader/lib/plugin");
const {VueLoaderPlugin} = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var config = require('../config');
const utils = require('./utils');
const path = require('path');
const threadLoader = require('thread-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const isEnvProduction = process.env.NODE_ENV === 'production';
console.log(isEnvProduction, 'isEnvProduction');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers');
// isEnvProduction ? null : threadLoader.warmup(
// 	{
// 		poolTimeout: 2000,
// 	},
// 	[
// 		'vue-loader',
// 		'babel-loader',
// 	]
// )
module.exports = {
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  performance: {hints: false},
  entry: {
    // app: './src/main.js' // 编译文件入口
    app: path.resolve(__dirname, '../src/main.js'), // 编译文件入口
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 编译输出的静态资源根路径
    filename: isEnvProduction ?
      utils.assetsPath('js/[name].[contenthash].js') :
      utils.assetsPath('js/[name].js'), // 编译输出的文件名
    chunkFilename: isEnvProduction ?
      utils.assetsPath('js/[name].[contenthash].js') :
      utils.assetsPath('js/[name].[id].js'),
    // path: config.build.assetsRoot, // 编译输出的静态资源根路径
    // filename: '[name].js', // 编译输出的文件名
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.jsx'],
    alias: {
      // 'components': path.resolve(__dirname, '../src/components'),
      // 'assets': path.resolve(__dirname, '../src/assets'),
      // 'src': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src'),
      // 'vue$': 'vue/dist/vue.common.js',
      // 'vue$': 'vue/dist/vue.esm.js',
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          // {
          // 	loader: 'thread-loader',
          // },
          {
            loader: 'vue-loader',
            options: {},
          },
        ],
        exclude: /node_modules/,
      },
      {
        oneOf: [
          {
            // test: /\.(jsx|js)$/,
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: [
              // {
              // 	loader: 'thread-loader',
              // 	options: {
              // 		poolTimeout: 2000,
              // 		workers: 2,
              // 		workerParallelJobs: 30,
              // 	}
              // },
              {
                loader: 'babel-loader',
                options: {
                  babelrc: true,
                  cacheDirectory: true,
                },
              },
              /*{
                loader: 'esbuild-loader',
                options: {
                  loader: 'jsx',  // Remove this if you're not using JSX
                  target: 'es2015'  // Syntax to compile to (see options below for possible values)
                }
              }*/
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10 * 1024,
                  name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                  esModule: false,
                },
              }],
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10 * 1024,
                  name: utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
              }],
          },
          {
            test: /\.css$/,
            use: [
              // {loader:'vue-style-loader'},
              {
                loader: isEnvProduction ?
                  MiniCssExtractPlugin.loader :
                  'vue-style-loader',
              },
              {loader: 'css-loader'},
            ],
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset',
            generator: {
              // 输出文件位置以及文件名
              filename: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
            },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 超过100kb不转 base64
              },
            },
            // use: [{
            // 	loader: 'url-loader',
            // 	options: {
            // 		limit: 10 * 1024,
            // 		name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
            // 	}
            // }]
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: isEnvProduction ?
                  MiniCssExtractPlugin.loader :
                  'style-loader',
              },
              // 'style-loader',
              {
                loader: 'css-loader',
                // options: {
                // 	modules: true,
                // 	importLoaders: 2,
                // }
              },
              // {
              // 	loader: 'thread-loader',
              // 	// options: {
              // 	// 	workerParallelJobs: 2
              // 	// }
              // },
              'less-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    parser: 'postcss-scss',
                    plugins: [
                      ['autoprefixer'],
                    ],
                  },
                },
              },

            ],
          },
          {
            test: /\.scss$/,
            use: [
              {
                loader: isEnvProduction ?
                  MiniCssExtractPlugin.loader :
                  'style-loader',
              },
              // 'style-loader',
              {
                loader: 'css-loader',
                // options: {
                // 	modules: true,
                // 	importLoaders: 2,
                // }
              },
              // {
              // 	loader: 'thread-loader',
              // 	// options: {
              // 	// 	workerParallelJobs: 2
              // 	// }
              // },
              'sass-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    parser: 'postcss-scss',
                    plugins: [
                      ['autoprefixer'],
                    ],
                  },
                },
              },

            ],
          },
        ],
      },

    ],
  },
  stats: {
    assets: false,
    builtAt: true,
    moduleAssets: false,
    children: false,
    performance: false,
    warnings: false,
    colors: true,
    modules: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('public'),
          to: utils.resolve('dist/static'),
        }],
    }),
    new CleanWebpackPlugin(),
    new WebpackBar({
      color: '#58bc58',
      basic: false,
      profile: false,
    }),
    new VueLoaderPlugin(),
    // new SpeedMeasurePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      hash: true,
      minify: {
        removeAttributeQuotes: true,//压缩 去掉引号
        collapseWhitespace: true,
      },
    }),
    // AutoImport({
    // 	include: [
    // 		/\.js$/, // .md
    // 	],
    // 	resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    // 	resolvers: [ElementPlusResolver()],
    // }),

  ],
};
