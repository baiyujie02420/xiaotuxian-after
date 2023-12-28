// 商品分类页
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/category/top', (req, res) => {
        const sql ="SELECT JSON_ARRAYAGG(JSON_OBJECT('id',T1.id,'name',T1.NAME,'picture',T1.picture,'imageBanners',T1.imageBanners,'children',( SELECT JSON_ARRAYAGG( JSON_OBJECT('id', T2.id,'name',T2.NAME,'picture',T2.picture,'parentId',  T2.parentId,'parentName',T2.parentName,  'categories',T2.categories, 'brands',T2.brands, 'saleProperties',T2.saleProperties,'goods',(SELECT JSON_ARRAYAGG(JSON_OBJECT('id', T3.id,'name',T3.NAME,  'desc',T3.`desc`,'price',T3.price, 'picture',T3.picture,'orderNum',T3.orderNum )) AS test3 FROM goodssort_children_goods T3 WHERE T3.subType_id = T2.id))) AS test2 FROM goodssort_children T2 WHERE T2.parent_id = T1.id))) AS test FROM goodssort T1"

        db.query(sql, (err, results) => {
        if (err) return res.send({ status: 1, msg: err.message })
        console.log()
        res.send({
            msg: '操作成功',
            code: '1',
            result: JSON.parse(results[0].test)
        })
    })
})
module.exports = router
