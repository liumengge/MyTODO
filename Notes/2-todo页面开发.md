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