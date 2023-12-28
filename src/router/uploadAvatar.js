const express = require('express')
const router = express.Router()
const db = require('../db')
const { expressjwt } = require('express-jwt') // 解析token,并挂载到req上
const config = require('../config')
const fs = require('fs')
const multer = require('multer') // multer是一个node.js文件上传中间件,有了他才能读取到文件
let co = require('co') // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
const OSS = require('ali-oss')

//初始化阿里云oss
const client = new OSS({
  region: 'oss-cn-beijing', // OSS所在地区
  accessKeyId: 'LTAI5tNMbrh8MoTRR6iTL39P', // 通行id
  accessKeySecret: 'ZkqAa7GYeX6JJTG0G0HJoVAkrcOaJI', // 通行密钥
  bucket: '20231227', // 存储桶的名称
})

const endPoint = '20231227.oss-cn-beijing.aliyuncs.com' // URL前缀
const bucket = '20231227' // 存储桶的名称

// 配置multer中间件 处理HTTP请求中的文件数据
let upload = multer({
  storage: multer.diskStorage({
    //用于指定文件的保存目录
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    // 用于指定文件的名称
    filename: function (req, file, cb) {
      let changedName =
        new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname // 确保文件名的唯一性
      cb(null, changedName)
    },
  }),
})

// 图片上传
router.post(
  '/member/profile/avatar',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  upload.single('file'),
  (req, res) => {
    // console.log(req.file)
    let filePath = '.\\' + req.file.path // 文件路径
    let fileType = '.' + req.file.originalname.split('.')[1] //文件扩展名 例如:png jpg
    let fileName = Date.now() + fileType // 构建上传到阿里云的图片名
    // 阿里云 上传文件
    async function uploadImage() {
      try {
        client.useBucket(bucket)
        let result = await client.put('/images/' + fileName, filePath)
        let imageSrc = `http://${endPoint}/` + result.name
        // 把图片url地址存到数据库
        const sql = 'update user set avatar=? where id=?'
        const values = [imageSrc, req.auth.id]
        db.query(sql, values, (err, results) => {
          if (err) return res.send({ status: 1, msg: err.message })
          if (results.affectedRows !== 1)
            return res.send({ status: 1, msg: '更新数据库失败' })
          return res.send({
            msg: 'success',
            result: {
              avatar: imageSrc,
            },
          })
        })
        fs.unlinkSync(filePath)
      } catch (error) {
        res.send({
          msg: 'failed',
          error,
          avatar: null,
        })
        fs.unlinkSync(filePath)
      }
    }
    uploadImage()
  }
)
module.exports = router
