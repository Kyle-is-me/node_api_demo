const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const models = require("../db/models");

app.use(express.json());

//for parsing application/xwww-from-urlencoded
app.use(express.urlencoded());

// for parsing application/xwww-form-urlencode
app.use(bodyParser.urlencoded({ extended: true }));

// 1. 所有的错误，http status ==500

/** 创建一个todo */
app.post("/create", async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body;
    /** 数据持久化到数据库 */
    let todo = await models.Todo.create({
      name,
      deadline,
      content,
    });
    res.json({
      todo,
      message: "任务创建成功",
    });
  } catch (error) {
    next(error);
  }
});

/** 修改一个todo */
app.post("/update", async (req, res, next) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id,
      },
    });
    if (todo) {
      todo = await todo.update({
        name,
        deadline,
        content,
      });
    }
    res.json({
      todo,
      //   message: "修改成功",
    });
  } catch (error) {
    next(error);
  }
});

/** 修改一个todo 删除*/
app.post("/update_status", async (req, res, next) => {
  let { id, status } = req.body;
  let todo = await models.Todo.findOne({
    where: {
      id,
    },
  });
  if (todo && status != todo.status) {
    //执行更新
    todo = await todo.update({
      status,
    });
  }
  res.json({
    todo,
  });
});

/** 查询任务列表 */
app.get("/list/:status/:page", async (req, res, next) => {
  let { status, page } = req.params;
  let limit = 10;
  let offset = (page-1)*limit;
  let where = {};
  if(where != -1){
      where.status = status
  }
  //1.状态 1：表示待办 2：完成 3：删除， -1：全部
  let list  = await models.Todo.findAndCountAll({
      where,
      limit,
      offset
  })
  res.json({
    list,
    message:'列表查询成功'
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
