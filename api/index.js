const express = require('express')
const router = express.Router()

const app = express()

// 通常我们都是这样用 bodyParser 的
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
// Nuxt 运行我们在 nuxt.config.js 里面配置
// 
// serverMiddleware: [
//   bodyParser.json(),
//   '~/api'
// ]

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// YOU ANY RESTFul API
// Nuxt 怎么去访问这个 API..?!
router.post('/track-data', (req, res) => {
  // 访问数据库，存数据
  // 从数据库取数据
  // 你的后端 API, any code you run...

  console.log('Stored data: ', req.body.data)
  res.status(200).json({ message: 'Sucess!' })
})

module.exports = {
  path: '/api',
  handler: router
}

