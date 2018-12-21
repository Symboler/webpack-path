const path = require('path');
 const CleanWebpackPlugin = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack');

 module.exports = {
   entry: {
     app: './src/index.js',
     vendor: './src/vendor.js'
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
       title: 'Production'
     }),
     new webpack.NamedModulesPlugin(),  // 添加了 NamedModulesPlugin，以便更容易查看要修补(patch)的依赖
     new webpack.HotModuleReplacementPlugin(), // 开启模块热更新
   ],
   optimization: {
     splitChunks: {
       cacheGroups: {
         commons: {
           name: 'commons',
           minChunks: 1,
           chunks: 'all',
         },
       },
     },
  },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   }
 };