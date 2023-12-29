const express = require('express')
const userRouter = require('./router/user')
const homeRouter = require('./router/home')
const hotRouter = require('./router/hot')
const goodsSort = require('./router/goodsSort')
const goodsDetail = require('./router/goodsDetail')
const avatarRouter = require('./router/uploadAvatar')
const addressRouter = require('./router/address')
const carRouter = require('./router/car')
const app = express()
const Joi = require('joi')
const cors = require('cors')
app.use(express.static('uploads')) // 静态托管资源
// 允许跨域
app.use(cors())
// 解析表单数据以及ajax，axios数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 挂载路由中间件
app.use(userRouter)
app.use(homeRouter)
app.use(hotRouter)
app.use(goodsSort)
app.use(goodsDetail)
app.use(avatarRouter)
app.use(addressRouter)
app.use(carRouter)

// 配置全局错误 中间件
app.use((err, req, res, next) => {
  // 如果joi校验出现错误
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      msg: err.message,
    })
  }
  // 身份校验错误
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 1,
      msg: '身份认证失败',
    })
  }
  // 其余未知错误
  res.send({
    status: 1,
    msg: err.message,
  })
})

// 监听服务器启动
app.listen(8888, () => {
  console.log('Server running at 127.0.0.1:8888')
})
