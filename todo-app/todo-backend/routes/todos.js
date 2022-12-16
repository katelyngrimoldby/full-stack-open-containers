const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis/index')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const count = await getAsync('added_todos')
  await setAsync('added_todos', count ? Number(count) + 1 : 1)
  res.send(todo);
});

/* GET todo count */
router.get('/statistics', async (req, res) => {
  const count = await getAsync('added_todos')
  res.json({ "added_todos": count ? Number(count) : 0 })
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
    res.json(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await req.todo.updateOne(req.body)
  res.json(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
