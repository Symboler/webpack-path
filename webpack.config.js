const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist文件夹
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map', // 开启sourcemap
  devServer: {
       contentBase: './dist', // 告诉web-dec-server在哪里查找文件
       hot: true, // 开启模块热更新
    },
  module: {
    rules: [   // 借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']    
      }
    ]
  },
  plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
         title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),  // 添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
        new webpack.HotModuleReplacementPlugin() // 开启模块热更新
     ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};