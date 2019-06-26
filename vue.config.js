const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts', // エントリーポイントとなるjs
      template: 'public/index.html', // テンプレートのHTML
      filename: 'index.html', // build時に出力されるファイル名
    },
  },
  outputDir: "doc",
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' }, // index.html に飛ばす
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'components': path.resolve(__dirname, 'src/components'),
      }
    },
    plugins: [
      // plugin
    ]
  }
}