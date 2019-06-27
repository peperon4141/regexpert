// Please check
// https://cli.vuejs.org/config

const path = require('path')

module.exports = {
  publicPath: '/regexpert/',
  pages: {
    index: {
      entry: 'src/main.ts', // エントリーポイントとなるjs
      template: 'public/index.html', // テンプレートのHTML
      filename: 'index.html', // build時に出力されるファイル名
    },
  },
  outputDir: "docs",
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
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@quizzes': path.resolve(__dirname, 'src/quizzes'),
      }
    },
    plugins: [
      // plugin
    ]
  }
}