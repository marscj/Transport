const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'ant-design-vue': 'antd',
      'lodash': '_',
      'moment': 'moment',
      // 'html2canvas': 'html2Canvas',
      // 'jspdf': 'JsPDF'
      // 'vuesax': 'vuesax',
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    ]
  },
  devServer: {
    port: 8001,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        ws: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
}
