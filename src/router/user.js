const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi') // 验证表单数据的中间件
const { phoneNumber_schema, account_schema } = require('../schema/user')
const db = require('../db')
const jwt = require('jsonwebtoken') // 生成token
const { expressjwt } = require('express-jwt') // 解析token,并挂载到req上
const config = require('../config')


// 手机登录
router.post('/login/wxMin/simple', expressJoi(phoneNumber_schema), (req, res) => {
    const sql = 'select * from user where mobile=?'
    // 查询数据库，看该用户是否在数据库中
    db.query(sql, [req.body.phoneNumber], (err, results) => {
        if (err) {
            return res.send({ status: 1, msg: err.message })
        }
        if (results.length !== 1) {
            return res.send({ status: 1, msg: '该用户不存在' })
        }
        // 符合条件
        // 生成token
        // 在服务器端根据用户信息 生成token
        const user = { ...results[0], avatar: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({
            msg: '操作成功',
            code: 1,
            result: {
                id: results[0].id,
                mobile: results[0].phoneNumber,
                token: tokenStr,
                nikename: results[0].nickname,
                avatar: results[0].avatar,
                account: results[0].account
            }
        })
    })
})

// 账号密码登录
router.post('/login', expressJoi(account_schema), (req, res) => {
    const accountIfo = req.body
    // console.log(accountIfo, accountIfo.account)
    // 查询数据库有没有该账号
    const sql = 'select * from user where account=?'
    db.query(sql, accountIfo.account, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (results.length === 0) {
            return res.send({
                status: 1,
                msg: '该用户不存在'
            })
        }
        // 核对密码的正确性
        if (results[0].password !== accountIfo.password) {
            return res.send({
                status: 1,
                msg: '密码错误'
            })
        }
        // 生成token
        // 在服务器端根据用户信息 生成token
        const user = { ...results[0], avatar: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        res.send({
            status: 0,
            msg: '操作成功',
            result: {
                id: results[0].id,
                mobile: results[0].phoneNumber,
                token: tokenStr,
                nikename: results[0].nickname,
                avatar: results[0].avatar,
                account: results[0].account
            }
        })
    })
})

// 获取个人信息
router.get('/member/profile', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
    const sql = 'select * from user where id=?'
    db.query(sql, req.auth.id, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (results.length === 0) {
            return res.send({
                status: 1,
                msg: '获取用户信息失败'
            })
        }
        res.send({
            msg: '操作成功',
            result: {
                ...results[0]
            }
        })
    })
})

// 修改个人信息
router.post('/member/profile', expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }), (req, res) => {
    const { nickname, gender, birthday, profession, fullLocation } = req.body
    const sql = 'UPDATE user SET nickname=?, gender=?, birthday=?, profession=?, fullLocation=? WHERE id=?'
    const params = [nickname, gender, birthday, profession, fullLocation, req.auth.id]

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (results.affectedRows !== 1) {
            return res.send({
                status: 1,
                msg: '修改失败'
            })
        }
        db.query('SELECT * FROM user WHERE id=?', req.auth.id, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    msg: err.message
                })
            }
            if (results.length === 0) {
                return res.send({
                    status: 1,
                    msg: '修改失败'
                })
            }
            res.send({
                msg: '操作成功',
                result: results[0]
            })
        })
    })
})

module.exports = router
