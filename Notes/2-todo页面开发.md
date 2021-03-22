- [项目目录结构](#项目目录结构)
- [TODO页面开发](#todo页面开发)
  - [TodoMain.vue](#todomainvue)
  - [Tabs.vue](#tabsvue)
  - [mock数据模拟后端接口](#mock数据模拟后端接口)

## 项目目录结构

```
|- src  项目主目录
  |- index.js 入口文件
  |- app.vue  主页面
  |- assets   样式文件目录
  |- components   项目中的组件目录
  |- store    状态管理文件目录
  |- router   前端路由文件目录
  |- views    页面目录
|- webpack.config.js  webpack配置文件
|- .babelrc
|- .gitignore
|- Notes   项目开发笔记
```

## TODO页面开发

1. app.vue

引入TODO页面，设置项目背景

2. TODO.vue页面布局

- 一共分为三个部分：
  - header头部： Header组件
  - todo主体：TodoMain组件
  - 注脚(填写开发者信息)：Footer组件

- 其中，todo主体又分为三个部分：
  - 输入框(输入需要完成的事项)
  - todo项目显示区域：TodoList组件
  - todo项完成情况管理区域：Tabs组件

### TodoMain.vue

1. input输入框
   - 设置样式
   - 绑定键盘按下Enter需要触发的handleAddTodoList事件
   - handleAddTodoList事件逻辑：创建存放todo事项的数组，数组中的元素是一个对象结构，其中包含事项id，事项完成状态以及事项内容
2. 需要展示的todo事项 - TodoList.vue
   - 布局：input-checkbox用来勾选该事项是否已经完成，label标签中存放需要展示的todo事项，delete按钮用于删除事项
   - TodoMain.vue与TodoList.vue是父子组件的关系
     - input-checkbox：如果是已完成的事项展示勾选状态，如果是未完成的事项不展示勾选状态 - 根据父组件中传递过来的事件项todoList的完成状态设置动态class(父组件以属性的方式传递数据，子组件props接收数据)
     - label标签中展示的内容也是父组件中传递过来的每一项事件项
     - delete按钮：绑定删除事件，点击删除按钮时，子组件TodoList.vue通过$emit的方式告诉父组件将索引为index的事件项删除，这个index是父组件通过属性的方式传递过来的，也可以使用事件项的id号来实现删除操作；父组件TodoMain.vue通过@delete接收子组件提交的删除事件，最后，在父组件中定义deleteTodoList删除事件实现事件项的删除操作
### Tabs.vue

1. 逻辑分析

Tabs组件中的数据是与其父组件TodoMain.vue中事件项的显示状态相关的。Tabs组件中左侧显示的是剩余需要完成的事件项数目，会根据添加的事件项/完成事件项/删除事件项操作发生动态变化，中间部分由三个按钮组成，即，`ALL-显示所有的事件项`，`NeedToDo-剩余的需要完成的事件项`以及`Done-已经完成的事件项`，最右侧按钮需要实现删除所有已完成项的操作。

2. Tabs.vue页面开发

- 父组件TodoMain.vue设置一个展示变量show，用来指定当前是需要显示全部的事件项(All)，未完成的事件项(NeedToDo)还是已经完成的事件项(Done),父组件以属性的方式将展示状态传递给子组件Tabs.vue
- 在子组件Tabs.vue中，根据从父组件接收的show来设置动态class以显示不同的样式，点击某个状态的按钮时通过$emit告知父组件需要显示的哪一组事件项，父组件通过@handleshow接收该事件去调整当前需要显示的事件项
- 同样的，点击delete按钮时，子组件通知父组件将所有完成的事件项删除

### mock数据模拟后端接口

- 安装mockjs: `npm install mockjs`
- 生成模拟数据：

  ```javascript
  Mock.mock( rurl?, rtype?, template ) )
  ```
  表示当拦截到rurl和rtype的ajax请求时，将根据数据模板template生成模拟数据，并作为响应数据返回。其中：
  - rurl 可选，表示要拦截的url，可以使字符串，也可以是正则
  - rtype 可选，表示要拦截的ajax请求方式，如get、post
  - template 可选，数据模板，可以是对象也可以是字符串

或者
```javascript
Mock.mock( rurl, rtype, function(options){} )
```
  - function(option){} 可选，表示用于生成响应数据的函数

在该项目中，直接注册所有的mock服务。

1. 在mock文件夹下创建index.js文件，这就是注册所有mock服务的地方

```javascript
const Mock = require('mockjs')

Mock.setup({
  timeout: '200-600'
})

let configArr = []

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
  if (key === './index.js') return;
  configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split('|');
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
  }
});
```

服务注册好后，在项目入口index.js中引入：`require('./mock')`

在mock文件夹下新建一个allTodo.js文件，按照index注册服务的格式来写mock，比如：
```javascript
let allTodoList = [{
        id: 0,
        done: 1,
        value: '写完todoList项目'
    },{
        id: 0,
        done: 1,
        value: '学习vue2底层源码'
    },{
        id: 0,
        done: 0,
        value: '学习TS'
    }]

export default {
    'get|/allTodo':  option => {
    return {
      status: 200,
      message: 'success',
      data: allTodoList
    };
  }
}
```
表示的是在页面发起了ajax请求，路径是'/allTodo'，并且请求方式是get时，就会返回写好的mock数据。

此外，当想要展示大量数据时，不可能一个一个的写，可以根据mockjs的语法规范来快速生成一系列的数据，比如：
```javascript
let demoList = {
  status: 200,
  message: 'success',
  data: {
    total: 100,
    'rows|10': [{
      id: '@guid',
      name: '@cname',
      'age|20-30': 23,
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
    }]
  }
};
export default {
    'get|/parameter/query': demoList
}
```

这样就可以每次随机生成10条数据，总数为100条，其中id和name使用的占位符，age是随机取出20-30中的数字，job是随机取出其后数组中的某一项，这在[mockjs](http://mockjs.com/examples.html)或者[mock文档](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)里都有说明。