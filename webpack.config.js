let path = require('path');
let htmlWebpackGlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  //所有webpack 插件 的配置节点
  plugins: [
    new htmlWebpackGlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),  //处理vue-loader
  ],
  //所有第三方loader模块的配置
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.(jpg|png|gif|jpeg)/, use: 'url-loader?limit=7500&name=[hash:8]-[name].[ext]'},
      /*
        url-loader? ： 给图片指定参数
        limit：图片的大小，单位是byte，如果指定的值小于图片本身的大小，则不会转换为base64。
        name=[name]：图片名字还是取原来的名字
        .[ext]：图片的扩展名还是取原来的
        [hash:8]：指定图片的名字含有哈希值，取8位
      */
      {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//处理字体
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //处理es6代码,exclude表示该目录下的js文件不需要编译为es6
      {test : /\.vue$/,use : 'vue-loader'}  //处理vue文件
    ]
  },
  resolve : {
    alias : {
      //如果import的模块是以vue结尾的，那么会根据以下路径查找这个包
      // "vue$" : "vue/mui/vue.js",
    },
  }
};