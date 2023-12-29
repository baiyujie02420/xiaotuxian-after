const express = require('express')
const db = require('../db')
const router = express.Router()
// 获取预付订单(购物车去结算)
router.get('/member/order/pre', (req, res) => {
  let userAddresses = []
  let goods = []
  let goodsCount = 0 // 商品件数
  let totalPrice = 0 // 价格总计
  let totalPayPrice = 0 // 应付金额
  let postFee = 15 // 邮费
  let discountPrice = 0 // 折扣总计 默认不打折

  // 获取用户地址列表
  const addressSql = 'select * from address'
  db.query(addressSql, (err, results) => {
    if (err) return console.log('获取用户地址数据失败', err)
    const resultAddress = results.map((item) => {
      return { ...item, postalCode: 448000 }
    })
    userAddresses = resultAddress
    // 获取购物车的商品信息
    const goodsSql = 'select * from goodsDetail'
    db.query(goodsSql, (err, results) => {
      if (err) return console.log('获取购物车内商品数据失败', err)
      goods = results.map((item) => {
        return {
          ...item,
          payPrice: item.count * item.price,
          totalPrice: item.count * item.price,
          totalPrice: item.count * item.price,
        }
      })

      for (let i = 0; i < results.length; i++) {
        console.log(results[i].count)
        goodsCount = goodsCount + results[i].count
        totalPrice = totalPrice + results[i].count * results[i].price
      }
      totalPayPrice = totalPrice - discountPrice + postFee
      res.send({
        msg: '操作成功',
        result: {
          userAddresses,
          goods,
          summary: {
            goodsCount,
            totalPrice,
            totalPayPrice,
            postFee,
            discountPrice,
          },
        },
      })
    })
  })
})

module.exports = router
