// 地址管理路由
const express = require('express')
const router = express.Router()
const db = require('../db')
const jwt = require('jsonwebtoken') // 生成token
const { expressjwt } = require('express-jwt') // 解析token,并挂载到req上
const config = require('../config')

// 获取收货地址列表
router.get(
  '/member/address',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  (req, res) => {
    // 去数据库取数据
    const sql = 'select * from address'
    db.query(sql, (err, results) => {
      if (err) {
        return res.send({ status: 1, msg: err.message })
      }
      if (results.length === 0) {
        return res.send({ status: 1, msg: '获取数据库地址列表失败' })
      }
      res.send({ msg: '操作成功', result: results })
    })
  }
)
// 添加收货地址
router.post(
  '/member/address',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  (req, res) => {
    const body = req.body
    // 存数据到数据库
    const sql = 'insert into address set ?'
    const values = {
      receiver: body.receiver,
      contact: body.contact,
      fullLocation: body.fullLocation,
      address: body.address,
      isDefault: body.isDefault,
    }
    db.query(sql, values, (err, results) => {
      if (err) {
        return res.send({ status: 1, msg: err.message })
      }
      if (results.affectedRows !== 1) {
        return res.send({ status: 1, msg: '添加失败' })
      }
      // 如果新数据指定为是默认地址，也就是isDefault=1,那么就把其余的isDefault都改成0
      if (body.isDefault === 1) {
        const tableName = 'address' // 表名
        const fieldToUpdate = 'isDefault' // 要更新的字段名
        const newValueForOthers = 0 // 其它行的新值
        const newValueForTarget = 1 // 目标行的新值
        const targetName = body.receiver // 目标行的 name 字段值
        const updateQuery = `UPDATE ${tableName} SET ${fieldToUpdate} = CASE 
        WHEN receiver = '${targetName}' THEN ${newValueForTarget} ELSE ${newValueForOthers} END`
        db.query(updateQuery, (error, results) => {
          if (error) {
            console.error('更新查询出错：', error)
          } else {
            console.log(`成功更新 ${results.affectedRows} 行数据`)
          }
          // 把刚刚存进去的数据的id取出来
          const sql = 'select id from address where receiver=?'
          db.query(sql, body.receiver, (err, results) => {
            if (err) {
              return res.send({ status: 1, msg: err.message })
            }
            if (results.length === 0) {
              return res.send({ status: 1, msg: '添加失败1' })
            }
            res.send({
              msg: '操作成功',
              result: {
                id: results[0].id.toString(),
              },
            })
          })
        })
      }
    })
  }
)
// 删除收货地址
router.delete(
  '/member/address/:id',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  (req, res) => {
    const deleteid = req.params.id // 获取请求中的 ID 参数

    // 执行删除操作
    const condition = `id=${deleteid}` // 删除的条件
    const deleteQuery = `DELETE FROM address WHERE ${condition}`
    db.query(deleteQuery, (error, results) => {
      if (error) {
        console.error('删除查询出错：', error)
        return
      }
      res.send({
        msg: '操作成功',
        id: deleteid,
      })
    })
  }
)
// 获取收货地址详情
router.get(
  '/member/address/:id',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  (req, res) => {
    const id = req.params.id // 获取请求中的 ID 参数
    const sql = 'select * from address where id=?'
    db.query(sql, id, (err, results) => {
      if (err) {
        return res.send({ status: 1, msg: err.message })
      }
      if (results.length === 0) {
        return console.log('未找到该地址详情')
      }
      res.send({
        msg: '操作成功',
        result: results[0],
      })
    })
  }
)
// 修改收货地址
router.put(
  '/member/address/:id',
  expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }),
  (req, res) => {
    const id = req.params.id
    const body = req.body
    // 处理一下isDefault的值
    if (body.isDefault === 1) {
      const sql = 'update address set isDefault=0'
      db.query(sql, (err, results) => {
        if (err) {
          console.error('更新数据失败：', err)
          return
        }
        const updateQuery = 'update address set ? where id=?'
        const values = {
          receiver: body.receiver,
          contact: body.contact,
          fullLocation: body.fullLocation,
          address: body.address,
          isDefault: body.isDefault,
        }
        db.query(updateQuery, [values, id], (err, results) => {
          if (err) {
            console.error('更新数据失败：', err)
            return
          }
          res.send({
            msg: '操作成功',
            result: {
              id,
            },
          })
        })
      })
    }
  }
)
module.exports = router
