const express = require('express')
const Mock = require('mockjs')
const router = express.Router()
const db = require('../db')
const jwt = require('jsonwebtoken') // 生成token
const { expressjwt } = require('express-jwt') // 解析token,并挂载到req上
const config = require('../config')

// 请求购物车列表
router.get('/member/cart', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
  const sql = 'select * from goodsDetail'
  db.query(sql, (err, results) => {
    if (err) {
      return console.log('获取数据失败')
    }
    res.send({
      msg: '操作成功',
      result: results,
    })
  })
})
// 加入商品到购物车(模拟数据)
router.post('/member/cart', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
  const sql = 'insert into goodsDetail set ?'
  const mockskuid = Mock.Random.integer()
  const values = {
    name: Mock.Random.cword(5, 8),
    picture: 'https://yanxuan-item.nosdn.127.net/aff51f590178c31d5beaf44cbdf795d1.png',
    price: Mock.Random.float(0, 100, 2, 2),
    count: 1,
    skuid: mockskuid,
    attrsText: '颜色:瓷白色 尺寸：8寸',
    selected: 1,
    nowPrice: Mock.Random.float(0, 100, 2, 2),
    stock: 1100,
    isCollect: 1,
    discount: 1,
    isEffective: 1,
  }
  db.query(sql, values, (err, results) => {
    if (err) return console.log('写入商品到购物车数据库失败', err)
    console.log('模拟加入购物车的数据', results)
    res.send({
      msg: '操作成功',
      result: { ...values, id: results.insertId },
    })
  })
})
// 删除购物车商品（单品）
router.delete('/member/cart', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
  console.log(req.body.ids[0])
  const sqlquery = 'delete from goodsDetail where skuid= ?'
  db.query(sqlquery, req.body.ids[0], (err, results) => {
    if (err) {
      console.error('删除数据失败：', err)
      return
    }
    res.send({
      msg: '删除成功',
    })
  })
})
module.exports = router
