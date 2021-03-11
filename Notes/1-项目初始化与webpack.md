## 项目目标

1. 学习前端工程搭建，详细学习webpack
2. 完成TODO前端业务开发(增删改查)
3. 学习API定制，熟悉公司接口平台的使用规范
4. 学习NodeJS+MySQL服务端开发

## 项目初始化

1. 安装node环境(node v14.15.1)
2. 创建项目`MyTODO`
3. 初始化: 
   - `npm init`
4. 初始化包：
   - `npm i webpack vue vue-loader`
   - 根据`WARN`提示，安装需要的第三方依赖： `npm i css-loader vue-template-compliler postcss`

## webpack配置

1. 新建src目录(该目录即为开发目录)，新建`src/app.vue`，在这个组件上写一个简单的数据显示:
```javascript
<template>
  <div class="txt">
    {{ text }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'milly'
    }
  },
}
</script>

<style lang="">
  .txt {
    color: brown;
  }
</style>
```
2. 上述的vue是一个组件，这个组件不能直接挂载到html里面去，首先要进行挂载，创建`src/index.js`：
```javascript
import Vue from 'vue'
import App from 'app.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
```
这个js文件就是项目的入口文件。

3. 显然此时上述组件还不能在浏览器上直接运行，要想让它在浏览器上正常运行并在页面上显示`milly`，就需要配置webpack，webpack是来打包前端资源的，前端资源有很多不同的类型，比如:js,css,图片,字体等等，这些都是需要浏览器通过http请求去加载的内容，在开发webpapp的时候都是一整个js加载到浏览器端然后把所有的内容渲染出来，所以可以以js文件作为入口:
```javascript
const path = require('path')

module.exports = {
   // webpack打包的目标文件地址, path是node自带的包，path.join()实现路径拼接
   // __dirname表示的是当前目录的绝对地址
  entry: path.join(__dirname, 'src/index.js'),
  // webpack打包之后输出的文件地址，filename是打包生成的js文件
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  }
}
```
最终，webpack会把`index.js`文件以及里面所依赖的App组件，都打包成一个完整的能够在浏览器中直接运行的bundle.js文件。

在`package.json`文件中加一个script脚本：
```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  }
```
上述新加的`build`脚本表示：在终端运行`npm run build`时，执行的是`webpack --config webpack.config.js`，配置这个脚本的原因是：只有在这里执行时才会调用安装在项目中的webpack，如果直接在命令行里面输入，调用的是全局的webpack，全局的跟项目中的webpack版本可能不一样。

终端执行`npm run build`会出现一个error：
```
ERROR in ./src/app.vue 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```
这表示，需要为.vue文件声明一个loader，因为webpack原生是只支持js文件类型，支持的语法是ES5的语法所以在使用超出它理解范围的语法时，需要一些工具协助处理。

`webpack.config.js`文件中配置module:
```javascript
module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
```
再次执行`npm run build`，又会有两个报错信息如下：
```
ERROR in ./src/app.vue
Module Error (from ./node_modules/vue-loader/lib/index.js):
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
 @ ./src/index.js 2:0-27 8:19-22

ERROR in ./src/app.vue?vue&type=style&index=0&lang=css& (./node_modules/vue-loader/lib??vue-loader-options!./src/app.vue?vue&type=style&index=0&lang=css&) 18:0
Module parse failed: Unexpected token (18:0)
File was processed with these loaders:
 * ./node_modules/vue-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
|
|
> .txt {
|   color: brown;
| }
 @ ./src/app.vue?vue&type=style&index=0&lang=css& 1:0-123 1:139-142 1:144-264 1:144-264
 @ ./src/app.vue
 @ ./src/index.js
```

根据error修改webpack配置：
```javascript
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      {
        test: /\.css$/,
        loader: ['css-loader']
      
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
```

除了加载vue文件，webpack还能加载前端所能用到的所有静态资源，比如css，图片等，与上述配置类似，相关配置为：
```javascript
module: {
   rules: [
   //  ...
   {
      test: /\.css$/,
      use: [
         "style-loader",
         "css-loader"
      ]
   },
   {
      test: /\.(png|gif|jpg|jpeg|svg)$/,
      use: [{
         loader: "url-loader",
         options: {
         limit: 1024, 
         name: "[name].[ext]" 
         }
      }]
   
   }
   ]
},
```
- css，在前端项目运行的时候，作为一个外部文件去处理的，或者是把样式写到HTML内容当中，作为一个style标签，然后把里面的样式全部列出来，所以有不同的处理方式，所以使用use来声明不同的方式。
- `css-loader`只是帮我们把css内容读出来，最终是需要把它写到一个新的文件里面还是插到HTML里面，需要用别的loader来帮助处理。增加了`style-loader`，则写好的css会在js中以一段js代码出现，这段js代码的作用是把css写到html当中。
- 注意以上两个loader的书写顺序！！！`css-loader`会遍历所有的css文件，找到所有的`url（...`）并进行处理，`style-loader`则是把所有的样式插入到页面的style标签里面，因此，这个顺序是先加载`css-loader`再加载`style-loader`，在webpack.config.js文件里面，loader的解析是逆序的，因此要把`style-loader`写在`css-loader`的前面。


- 图片，有不同的格式，书写时需要注意！
- use中可以写成对象的形式，每个loader都会有一些选项需要配置
- `url-loader`可以把图片转换成`base64`代码，直接写在js内容里面而不用生成一个新的文件， 对于一些小的图片作用很大，可以减少http请求
- 在`options`中指定一些参数，这些参数可以传给`url-loader`，来指定它的操作方式
- `url-loader`其实是`file-loader`的一个封装， `file-loader`会将图片读取，然后进行一些简单的操作之后再把这个图片文件重新换一个名字换个地方存储，`url-loader`在`file-loader`的基础上多做了一件事，它可以判断如果图片的大小小于1024，它就会将图片转译成base64的代码写到代码当中
- 因为有很多的图片，如果把名字写死，每个都是相同的了，图片的名字可以使用webpack的选项来定义， 根据它进来时候的name设置名字

如何使用？举个例子：创建项目中存放图片的文件夹`src/assets/images`存放几张图片，创建`src/assets/styles`文件夹来存放css文件，在`test.css`文件中设置一个简单的样式：
```css
body {
  color: blueviolet;
  background-image: url('../images/bg-world.jpg');
}
```
然后在入口文件中将图片和css引入，执行`npm run build`，会发现，css代码被写入打包后的`bundle.js`文件中，css文件中用来做背景的图片或者直接在`index.js`文件中引入的图片都会被正常打包到dist文件夹下，因为这两个图片比较大，所以没有被转成base64代码。

此外，使用css预处理器可以使用模块化的方式去写css代码 ，而不是以.css的方式写原生代码。比如：
```javascript
{
   test: /\.styl$/,
   use: [
      'style-loader',
      'css-loader',
      'stylus-loader'
   ]
}
```
css预处理器书写格式比较随意，比如：创建`src/assets/styles/test-stylus.styl`文件，写一点简单的样式：
```css
body 
  font-size 20px
```
然后再index.js文件中引入这个.styl文件，执行`npm run build`可以正常打包到生成的bundle.js文件中国(记得安装对应的loader)。同样的，其他像Sass,Less等CSS预处理器同样可以通过在webpack中配置对应的loader进行打包。

4. 配置`webpack-dev-server`

- 安装：`npm i webpack-dev-server`
- 在执行`npm run build`的时候表示的是利用webpack启用项目中配置的`webpack.config.js`文件去打包项目文件，则如果想要使用`webpack-dev-server`，就可以在package.json文件中添加一个script脚本，即：
  ```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --config webpack.config.js"
  }
  ```
  这就表示使用`webpack-dev-server`来启用项目中配置的`webpack.config.js`文件，这是专门适用与开发环境的，那么对应的`webpack.config.js`文件也要修改为适用与开发环境的相关配置。
- 适用于`webpack-dev-server`开发模式的相关配置：
  - 全局添加`target: 'web'`，因为是开发前端项目，是跑在浏览器端的
  - 因为这个配置文件是会同时使用的正式环境和开发环境下的，所以需要 根据不同的环境做一些判断。如何判断？ 设置一个环境变量，来表示显示使用的是开发环境还是正式环境
    - 安装一个包 `npm i cross-env`，因为在不同的平台上设置环境变量的方式不同，mac上面可以直接设置NODE_ENV=production就能读取这个环境变量，但是在windows上面可能需要添加set，使用cross-env就免除了不同平台不同命令的写法， 这样的话就可以在不同的平台上执行不同的脚本，具体的设置在package.json中的build和dev中，即：`"build": "cross-env NODE_ENV=production webpack --config webpack.config.js"`和`"dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"`
    - 接下来就是设置环境变量：`const isDev = process.env.NODE_ENV === 'development'`，在设置build和dev环境的时候，NODE_ENV全部是保存在process.env这个对象里面的
    - 判断：
      ```javascript
      // ...
      const isDev = process.env.NODE_ENV === 'development'

      const config = {
         target: 'web',
         entry: path.join(__dirname, 'src/index.js'),
         output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'dist')
         },
         module: {rules: []},
         plugins: []
      }

      if (isDev) {
         config.devServer = {
            port: 8000,
            host: '0.0.0.0',
            overlay: {
               errors: true
            },
            hot: true
         }
      }

      module.exports = config
      ```
      - devServer是在webpack2以后才加入的。
      - `webpack-dev-server`启动，是一个服务，这个服务需要监听一个端口，host设置为`'0.0.0.0'`的原因是可以通过`localhost`进行访问，同时也可以使用本机的内网IP进行访问，如果直接设置成localhost，那么通过内网的ip是访问不了的。使用ip的好处是可以使用别人的电脑访问或者使用手机调试。
      - `overlay`：表示webpack在编译的过程中如果出现任何的错误，都将这个错误显示到网页上面，便于查看
    - 目前编译的是js和css，没有一个html去容纳这个bundle.js文件，项目是跑不起来的，如何实现？安装一个插件`npm i html-webpack-plugin`。如何使用？

      在webpack配置文件中引入，然后设置plugins插件:
      ```javascript
      const HTMLPlugin = require('html-webpack-plugin')

      const config = {
         target: 'web',
         entry: path.join(__dirname, 'src/index.js'),
         output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'dist')
         },
         module: {
            rules: []
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
      ```
      在使用vue的时候一定需要使用到webpack的DefinePlugin，它是给webpack在编译的过程中以及自己写的JS代码的时候，判断环境都可以调用`process.env.NODE_ENV`进行判断，也就是说在这里定义之后，在JS代码中是可以引用的。此外，vue会根据不同的环境区分打包，vue的dist文件中会有很多不同版本的vue源代码，在开发环境下是一个比较大的版本，里面会包含很多的错误信息的提示信息以及很多的功能。这些功能在正式环境下是不希望被使用的，因为他会加大文件的大小，会降低整个代码的运行效率，在开发环境下使用development有很多好处，可以得到在渲染时候的一些错误提醒。注意：里面的双引号要写！
   