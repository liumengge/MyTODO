# MyTODO
## 项目学习目标
### 前端(Webpack+Vue+VueRouter)
1. 从webpack学习前端工程搭建，实现TODO
2. 学习vue3开发流程，实现TODO
3. 学习TS

### 后端(NodeJS+MySQL)
1. 熟悉express，能够实现服务器资源处理
2. 熟悉NodeJS+MySQL搭建数据接口平台，熟悉公司接口管理平台的使用
3. 使用sequelize实现todo的CURD
## 项目功能
1. input窗口输入自己需要完成的任务，Enter之后添加到下方列表中
2. 单项任务的操作：
   1. 如果已经完成了某项任务，勾选左侧按钮，该项任务变成灰色
   2. 可以点击单项任务的右侧红叉删除任务
3. 底部：
   1. 左侧：动态计算未完成的任务数目
   2. 中间部分：根据不同状态切换完成或者未完成的任务列表
   3. 右侧：点击按钮可以删除所有已经完成的任务

## 项目启动

- 前端：
```javascript
git clone git@github.com:liumengge/MyTODO.git

cd MyTODO

npm install

npm run dev
```

- 后端服务器：

```javascript
git clone git@github.com:liumengge/MyTODO_server.git

cd MyTODO_server

cd todoServer

npm install

npm run serve

// 数据库
// 设置数据库连接配置 - config/config.json
// 将data下的sql文件导入到数据库
```