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
    const re = results.map((item) => {
      return {
        ...item,
        selected: item.selected === 1 ? true : false,
      }
    })
    console.log(re)
    res.send({
      msg: '操作成功',
      result: re,
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
// 修改购物车单品
router.put('/member/cart/:skuid', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
  const skuid = req.params.skuid
  const body = req.body
  const sql = `update goodsDetail set ? where skuid=${skuid}`
  if (body.selected === 0) {
    db.query(sql, { count: body.count, selected: body.selected }, (err, results) => {
      if (err) return console.log('修改购物车单品失败', err)
      // console.log(results)
    })
  } else {
    db.query(sql, { count: body.count, selected: 1 }, (err, results) => {
      if (err) return console.log('修改购物车单品失败', err)
      // console.log(results)
      const querySql = `select * from goodsDetail where skuid=${skuid}`
      db.query(querySql, (err, results) => {
        // console.log(results[0])
        res.send({
          msg: '操作成功',
          result: results[0],
        })
      })
    })
  }
})
// 购物车全选反选
router.post('/member/cart/selected', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
  const selected = req.body.selected
  console.log(selected, 999)
  const sql = `update goodsDetail set selected=${selected}`
  db.query(sql, (err, results) => {
    if (err) {
      console.error('更新数据失败：', err)
      return
    }
    res.send({
      msg: '操作成功',
    })
  })
})
module.exports = router
