const express = require('express')
const db = require('../db')
const router = express.Router()

// 获取首页banner图
router.get('/home/banner', (req, res) => {
    const sql = 'select * from banner_home'
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })
        if (results.length === 0) {
            return res.send({
                status: 1,
                result: [],
                msg: '数据为空'
            })
        }
        res.send({
            msg: '操作成功',
            code: '1',
            result: results
        })
    })
})
// 获取前台分类数据
router.get('/home/category/mutli', (req, res) => {
    const sql = 'select * from cate_home'
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })
        if (results.length === 0) {
            return res.send({
                status: 1,
                result: [],
                msg: '数据为空'
            })
        }
        res.send({
            msg: '操作成功',
            code: '1',
            result: results
        })
    })
})
// 获取热门推荐数据
router.get('/home/hot/mutli', (req, res) => {
    const sql = 'select * from hot_recommend'
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })
        if (results.length === 0) {
            return res.send({
                status: 1,
                result: [],
                msg: '数据为空'
            })
        }
        // const re = results.map((item) => {
        //     return { ...item, pictures: item.pictures.split(',') }
        // })
        for (let i = 0; i < results.length; i++) {
            results[i].pictures = results[i].pictures.split(',')
        }
        
        res.send({
            msg: '操作成功',
            code: '1',
            result: results
        })
    })
})
// 获取新鲜好物数据
router.get('/home/new', (req, res) => {
    const sql = 'select * from fresh_goods'
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })
        if (results.length === 0) {
            return res.send({
                status: 1,
                result: [],
                msg: '数据为空'
            })
        }
        res.send({
            code: '1',
            msg: '操作成功',
            result: results
        })
    })
})

// 获取猜你喜欢数据
router.get('/home/goods/guessLike', (req, res) => {
    const pageSize = Number(req.query.pageSize) // 每页有多少条数据
    const page = Number(req.query.page) // 第几页
    const offset = (page - 1) * pageSize // 0 10 20

    const countSql = 'select count(*) as total from guess_like'
    // 例如，假设 pageSize 是 10，offset 是 20，那么这个查询语句将从 guess_like 表中获取第 21 到第 30 行的数据，即获取偏移量为 20 的位置开始的后续 10 行数据。
    const dataSql = `select * from guess_like limit ${pageSize} offset ${offset}`

    db.query(countSql, (countErr, countResults) => {
        if (countErr) {
            return res.send({ status: 1, msg: countErr.message })
        }
        const total = countResults[0].total // 一共多少条数据
        db.query(dataSql, (dataErr, dataResults) => {
            if (dataErr) {
                return res.send({ status: 1, msg: dataErr.message })
            }
            if (dataResults.length === 0) {
                return res.send({
                    code: '1',
                    msg: '操作成功',
                    result: {
                        counts: total,
                        pageSize,
                        pages: Math.ceil(total / pageSize),
                        page,
                        items: dataResults
                    }
                })
            }
            res.send({
                code: '1',
                msg: '操作成功',
                result: {
                    counts: total,
                    pageSize,
                    pages: Math.ceil(total / pageSize),
                    page,
                    items: dataResults
                }
            })
        })
    })
})

module.exports = router
