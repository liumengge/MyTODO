const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: 'development',
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },  
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.jsx$/,
        loader: ['babel-loader']
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024, 
            name: "[name].[ext]" 
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    })
  ]
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.(css|scss|sass)$/,
      use: [
        { loader: 'style-loader' },  // 将 JS 字符串生成为 style 节点 
        { loader: 'css-loader' },   // 将 CSS 转化成 CommonJS 模块
        { 
          loader: 'sass-loader',  // 将 Sass 编译成 CSS
          options: {
            implementation: require('dart-sass')
          }
        }   
      ]
    }
  )

  config.devtool = '#cheap-module-eval-source',
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true,
    proxy: {
      '/api':{ 
        //'/api' 地址是自己定义的
        target:'http://localhost:3000',  //要解决跨域的地址
        changeOrigin:true,  //在本地搭建一个虚拟服务，去发送种请求拦截服务
        pathRewrite:{  //地址重写
          '^/api': ''
        }
      }
    }
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else {
  // 正式环境
  config.entry = {
    app: path.join(__dirname, "src/index.js"),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.(css|scss|sass)$/,
      use: [
        { loader: 'style-loader' },  // 将 JS 字符串生成为 style 节点 
        { loader: 'css-loader' },   // 将 CSS 转化成 CommonJS 模块
        { 
          loader: 'sass-loader',  // 将 Sass 编译成 CSS
          options: {
            implementation: require('dart-sass')
          }
        }   
      ]
    }
  )
}

module.exports = config