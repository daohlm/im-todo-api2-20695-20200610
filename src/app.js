let express = require('express');
let bodyParser = require('body-parser');
let models = require('../db/models');
let app = express();
app.use(express.json())
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded())
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded())
/** 查询人物列表 */
app.get('/list/:status/:page', async (req, res, next) => {
    let {status, page } = req.params;
    let limit = 10;
    let offset = (page - 1) * limit;
    let where = {};
    if (status + '' !== '-1') {
        where.status = status;
    }
    let list = await models.Todo.findAndCountAll({
        where,
        limit,
        offset
    });
    res.json({
        list
    })
});
app.use('/create', async (req, res, next) => {
    try {
        let {name, deadline, content} = req.body;
        let todo = await models.Todo.create({
            name, deadline, content
        });
        res.json({
            todo,
            message: '任务创建成功'
        })
    } catch (e) {
        next(e);
    }
})
app.use('/update', async (req, res, next) => {
    try {
        let {name, deadline, content, id} = req.body;
        let todo = await models.Todo.findOne({
            where: {
                id
            }
        })
        if (todo) {
            todo = await todo.update({
                name, deadline, content
            })
        }
        res.json({
            todo
        });
    } catch (e) {
        next(e)
    }
})
app.use('/update-status', async (req, res, next) => {
    let {id, status} = req.body;
    let todo = await models.Todo.findOne({
        where: {
            id
        }
    })
    if (todo && status !== todo.status) {
        todo = await todo.update({
            status
        })
    }
    res.json({
        todo
    });
})
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message
        })
    }
})
app.listen(3000, () => {
    console.log('服务启动成功');
})