const express = require('express')
const db = require('../db')
const router = express.Router()

// 热门推荐-特惠推荐
router.get('/hot/preference', (req, res) => {
    const sql =
        "SELECT JSON_OBJECT('id', p.id, 'bannerPicture', p.bannerPicture, 'title', p.title, 'subTypes', JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'title', c.title, 'goodsItems', (SELECT JSON_OBJECT('items', JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'desc', d.desc, 'price', d.price, 'picture', d.picture, 'orderNum', d.orderNum))) FROM hot_preference_goodsitems d WHERE c.id = d.subType_id)))) AS JSON_DATA FROM hot_preference p LEFT JOIN hot_preference_subtypes c ON p.id = c.parent_id GROUP BY p.id ,p.title ,p.bannerPicture"
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })

        const re = JSON.parse(results[0].JSON_DATA)
        res.send({
            msg: '操作成功',
            code: '1',
            result: re
        })
    })
})

// 热门推荐-爆款推荐
router.get('/hot/inVogue', (req, res) => {
    const sql =
        "SELECT JSON_OBJECT('id', p.id, 'bannerPicture', p.bannerPicture, 'title', p.title, 'subTypes', JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'title', c.title, 'goodsItems', (SELECT JSON_OBJECT('items', JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'desc', d.desc, 'price', d.price, 'picture', d.picture, 'orderNum', d.orderNum))) FROM inVogue_subTypes_goodsItems d WHERE c.id = d.subType_id)))) AS JSON_DATA FROM inVogue_recommend p LEFT JOIN inVogue_subTypes c ON p.id = c.parent_id GROUP BY p.id ,p.title ,p.bannerPicture"
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })

        const re = JSON.parse(results[0].JSON_DATA)
        res.send({
            msg: '操作成功',
            code: '1',
            result: re
        })
    })
})

// 热门推荐-一站买全
router.get('/hot/oneStop', (req, res) => {
    const sql =
        "SELECT JSON_OBJECT('id', p.id, 'bannerPicture', p.bannerPicture, 'title', p.title, 'subTypes', JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'title', c.title, 'goodsItems', (SELECT JSON_OBJECT('items', JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'desc', d.desc, 'price', d.price, 'picture', d.picture, 'orderNum', d.orderNum))) FROM onstop_subtypes_goodsItems d WHERE c.id = d.subType_id)))) AS JSON_DATA FROM onstop p LEFT JOIN onstop_subTypes c ON p.id = c.parent_id GROUP BY p.id ,p.title ,p.bannerPicture"
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })

        const re = JSON.parse(results[0].JSON_DATA)
        res.send({
            msg: '操作成功',
            code: '1',
            result: re
        })
    })
})
// 热门推荐-新鲜好物
router.get('/hot/new', (req, res) => {
    const sql =
        "SELECT JSON_OBJECT('id', p.id, 'bannerPicture', p.bannerPicture, 'title', p.title, 'subTypes', JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'title', c.title, 'goodsItems', (SELECT JSON_OBJECT('items', JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'desc', d.desc, 'price', d.price, 'picture', d.picture, 'orderNum', d.orderNum))) FROM newfresh_subtypes_goodsItems d WHERE c.id = d.subType_id)))) AS JSON_DATA FROM newfresh p LEFT JOIN newfresh_subTypes c ON p.id = c.parent_id GROUP BY p.id ,p.title ,p.bannerPicture"
    db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })

        const re = JSON.parse(results[0].JSON_DATA)
        res.send({
            msg: '操作成功',
            code: '1',
            result: re
        })
    })
})
module.exports = router
