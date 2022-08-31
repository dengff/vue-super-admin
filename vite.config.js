import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import path from "path";
import {resolve} from 'path';
// import {createVuePlugin} from 'vite-plugin-vue2';
// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  //   jsxInject: `import {h} from 'vue'`
  // },
  plugins: [
    vue(),
    vueJsx(),
    // createVuePlugin({
    //   jsx: true,
    //   exclude: /\.vue$/
    //   // jsxOptions: { //jsx 配置
    //   //   compositionAPI: 'plugin',
    //   //   // target: ''
    //   // },
    // }),

  ],
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.jsx'],
    alias: {
      '@': resolve(__dirname, './src'),
      'components': resolve(__dirname, './src/components'),
      'src': resolve(__dirname, './src'),
      // 'components': path.resolve(__dirname, '../src/components'),
      // // 'assets': path.resolve(__dirname, '../src/assets'),
      // 'src': path.resolve(__dirname, '../src'),
      // '@': path.resolve(__dirname, '../src'),
    },
  },
  base: './',
  server: {
    hot: true,
    hmr: true,
    // open: true,
    host: 'localhost',
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/apiFox': {
        target: 'https://mock.apifox.cn/m1/1225980-0-default',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiFox/, ''),
      },
      '/TrendyScm-rest/rest': {
        target: 'https://test-scm.trendy-global.com',
        // 实际上我们的真正请求地址为 https://api.github.com/users 所有我们需要通过 pathRewrite 配置项进行重写路径
        rewrite: (path) => path.replace(/^\/TrendyScm-rest\/rest/, ''),
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为。
        changeOrigin: true,
      },
      '/app-scm': {
        target: 'https://test-scm.trendy-global.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app-scm/, ''),
      },
    },
  },
  publicDir: 'src/static',
});
