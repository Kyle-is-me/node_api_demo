

# 需求说明,API说明

1. 根据客户单传递过来的不同的参数（状态/页码） 查询 任务的列表
2. 实现 新增一个任务的功能 (名称/截止日期/内容)
3. 实现一个 编辑的功能：根据客户端 传递的 任务对象 （已经存在的数据） 进行编辑 名称/截止日期/内容/id)
4. 删除一个任务，（ID）
5. 修改任务的状态 （ID/状态--待办---完成）

# API 实现

## 数据库的初始化
1. 创建一个数据库
2. 使用 `sequelize cli` 初始化项目的数据库配置信息
    `npx sequelize init`
3. 生成模型文件
    1. migrate 文件
    2. model 文件
    ` npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string`   
4. 持久化 模型对应的[数据库表] 
    `npx sequelize db:migrate`

## api里面具体使用ORM模型


## 项目的发布和运维

pm2


启动命令/运维命令/运维文档
1. pm2 start ecosystem.config.js
2. pm2 log
3. pm2 restart ecosystem.config.js


# 课程回顾

1. 技术栈
    1. node --> http，异常
    2. web框架： express 、hapi、koa、egg
    3. 参数校验
    4. mysql 的使用
    5. ORM，sequelize 使用
2. 技术的关键点
    api
    web->webserver->router->hander->orm->db

3. 注意事项
    1. 需要做详细的 模型设计 -> 模型之间的关系
    2. api的使用文档 --> api问你当的使用工具
    3. 测试