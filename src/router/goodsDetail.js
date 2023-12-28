// 商品详情
const express = require('express')
const db = require('../db')
const router = express.Router()
router.get('/goods', (req, res) => {
    // mock数据
    const mock = {
        code: '1',
        msg: '操作成功',
        result: {
            id: '1028003',
            name: '全能收纳王，棉麻涤·收纳盒',
            spuCode: '1028003',
            desc: '结实棉麻，大容量收纳',
            price: '29.90',
            oldPrice: '29.90',
            discount: 1,
            inventory: 1692266,
            brand: {
                id: 'spider99999999999',
                name: '传智自有品牌',
                nameEn: 'chuanzhi',
                logo: 'https://yanxuan-item.nosdn.127.net/f6ddd429632de6170900dc2fbc541fd8.png?type=webp&imageView&thumbnail=78x78&quality=95',
                picture:
                    'https://yanxuan-item.nosdn.127.net/f6ddd429632de6170900dc2fbc541fd8.png?type=webp&imageView&thumbnail=78x78&quality=95',
                type: null,
                desc: null,
                place: null
            },
            salesCount: 2443,
            commentCount: 2,
            collectCount: 1,
            mainVideos: [],
            videoScale: 1,
            mainPictures: [
                'https://yanxuan-item.nosdn.127.net/8efa36e2d40cf007f9b0982a952dd8f1.png',
                'https://yanxuan-item.nosdn.127.net/0fd235e5650bd45bd78cccbbb2d14745.jpg',
                'https://yanxuan-item.nosdn.127.net/c6494f571e009295ae8a7f54013ebcd1.jpg',
                'https://yanxuan-item.nosdn.127.net/0a03d4a263efd4bef7e8e43d36f7f823.jpg',
                'https://yanxuan-item.nosdn.127.net/31b02daf7924ff8784e0582a5d8e39f7.png'
            ],
            specs: [
                {
                    name: '类型',
                    id: '1482367815686160385',
                    values: [
                        {
                            name: '无盖（29*29*19cm）',
                            picture: 'https://yanxuan-item.nosdn.127.net/909cf3507c7fefdd374be022bc1407d9.png',
                            desc: '收纳-销售属性类型-无盖（29*29*19cm）-规格属性图片'
                        },
                        {
                            name: '带盖（39*27*25.7cm）',
                            picture: 'https://yanxuan-item.nosdn.127.net/aff51f590178c31d5beaf44cbdf795d1.png',
                            desc: '收纳-销售属性类型-带盖（39*27*25.7cm）-规格属性图片'
                        }
                    ]
                }
            ],
            skus: [
                {
                    id: '1027024',
                    skuCode: '1027024',
                    price: '36.00',
                    oldPrice: '36.00',
                    inventory: 5900,
                    picture: 'https://yanxuan-item.nosdn.127.net/aff51f590178c31d5beaf44cbdf795d1.png',
                    specs: [
                        {
                            name: '类型',
                            valueName: '带盖（39*27*25.7cm）'
                        }
                    ]
                },
                {
                    id: '1027025',
                    skuCode: '1027025',
                    price: '29.90',
                    oldPrice: '29.90',
                    inventory: 4402,
                    picture: 'https://yanxuan-item.nosdn.127.net/909cf3507c7fefdd374be022bc1407d9.png',
                    specs: [
                        {
                            name: '类型',
                            valueName: '无盖（29*29*19cm）'
                        }
                    ]
                }
            ],
            categories: [
                {
                    id: '1008017',
                    name: '收纳',
                    layer: 2,
                    parent: {
                        id: '1005000',
                        name: '居家',
                        layer: 1,
                        parent: null
                    }
                },
                {
                    id: '1005000',
                    name: '居家',
                    layer: 1,
                    parent: null
                }
            ],
            details: {
                pictures: [
                    'https://yanxuan-item.nosdn.127.net/cb3968dc4ca116eb6c37b44a7b90a815.jpg',
                    'https://yanxuan-item.nosdn.127.net/896793d593bc9243c1bc47719e8983b6.jpg',
                    'https://yanxuan-item.nosdn.127.net/63a8cfd6f6fd9ffbcdaefc6ae362eec0.jpg',
                    'https://yanxuan-item.nosdn.127.net/e6d16b4cbf7a3b0db6ff34577eeadff6.jpg',
                    'https://yanxuan-item.nosdn.127.net/a22df58d8480c0cd97629f3f588ad03d.jpg',
                    'https://yanxuan-item.nosdn.127.net/60d7e53a578af5bbd4bdd2d31de7a8bd.jpg',
                    'https://yanxuan-item.nosdn.127.net/324d94336247263c97c3b948d0024587.jpg',
                    'https://yanxuan-item.nosdn.127.net/58544e7095977723dee5bc27f22dc107.jpg',
                    'https://yanxuan-item.nosdn.127.net/f6dbcaa09d188d0ae74985b0f0638eef.jpg',
                    'https://yanxuan-item.nosdn.127.net/ca24ff8c50b5cf2ca0e3a21c98fcc52d.jpg',
                    'https://yanxuan-item.nosdn.127.net/acdb35ac518dffeeee6e88be4fda7058.jpg',
                    'https://yanxuan-item.nosdn.127.net/161331b2213744e36e69d13af8bec3b2.jpg',
                    'https://yanxuan-item.nosdn.127.net/73fbe65d819758e5bef5603140eb0635.jpg',
                    'https://yanxuan-item.nosdn.127.net/d19c73f74aab622fc7176c5870cfd221.jpg',
                    'https://yanxuan-item.nosdn.127.net/69b11abfd02d05ccef0bc68ab16edbe6.jpg',
                    'https://yanxuan-item.nosdn.127.net/a37d484a311c9b481c5ac68b6b7fdb3b.jpg',
                    'https://yanxuan-item.nosdn.127.net/cf3d634626f15f9c5b922651bf198d5a.jpg',
                    'https://yanxuan-item.nosdn.127.net/a302241add13a4cf767c1029532da19d.jpg',
                    'https://yanxuan-item.nosdn.127.net/99776cc02ab4db0efa22a2003780765e.jpg',
                    'https://yanxuan-item.nosdn.127.net/29a81042c966971c9ffb072010ac53ec.jpg',
                    'https://yanxuan-item.nosdn.127.net/e3908a45814fee7d002c6ab6fd19f684.jpg',
                    'https://yanxuan-item.nosdn.127.net/436d7e20071b2c5fe78af112ad766774.jpg',
                    'https://yanxuan-item.nosdn.127.net/7bd98433257d9ceeb1083a94f4f99cfc.jpg',
                    'https://yanxuan-item.nosdn.127.net/825083fa2403babdb3ccd6bfd177b5a7.jpg',
                    'https://yanxuan-item.nosdn.127.net/b840258502658185d732ed0c73eeb3c9.jpg',
                    'https://yanxuan-item.nosdn.127.net/fe1420eb0f5557c8941082e8d12c14da.jpg',
                    'https://yanxuan-item.nosdn.127.net/d3a086ce6daabdf8c974c978bdf8de4b.jpg',
                    'https://yanxuan-item.nosdn.127.net/96975b10f1934f9dd782b9010b6df456.jpg',
                    'https://yanxuan-item.nosdn.127.net/6b08e5a3202af855f84245e27f82fb96.jpg',
                    'https://yanxuan-item.nosdn.127.net/ec4cab557c3595de250cb7c5c8375ca2.jpg',
                    'https://yanxuan-item.nosdn.127.net/bc1d163d2705ee3eabc234aef56d3f74.jpg',
                    'https://yanxuan-item.nosdn.127.net/e38e500efd8075c3411e8244ef057413.jpg',
                    'https://yanxuan-item.nosdn.127.net/7687b06f1b065237a0ba07f523853ea8.jpg',
                    'https://yanxuan-item.nosdn.127.net/c979f432a69111b1e4bb3e54e8e31498.jpg',
                    'https://yanxuan-item.nosdn.127.net/28fb129988469f4af9856f3c7aebc102.jpg',
                    'https://yanxuan-item.nosdn.127.net/7303ad9a1356c68558fdb4217569435a.jpg',
                    'https://yanxuan-item.nosdn.127.net/72896fee652befcdc3321de51b93dec1.jpg',
                    'https://yanxuan-item.nosdn.127.net/47f83c711299616fbda17966eb6d10a5.jpg',
                    'https://yanxuan-item.nosdn.127.net/952db17329e1dba46b041f6dbee7c15b.jpg',
                    'https://yanxuan-item.nosdn.127.net/0f6a68a01b62ddac0e3fb1e376cdbf57.jpg',
                    'https://yanxuan-item.nosdn.127.net/c494109dbd2fe315522720b9a8b62d59.jpg',
                    'https://yanxuan-item.nosdn.127.net/82e9a26786c71546ee7f63e2eeaac817.jpg',
                    'https://yanxuan-item.nosdn.127.net/840fd5d4b12697f8161078a2b75585a0.jpg',
                    'https://yanxuan-item.nosdn.127.net/506edfa353691e1f88f1225f9e1c08f1.jpg',
                    'https://yanxuan-item.nosdn.127.net/f6008f5c693c9a0840472c0ade34301b.jpg',
                    'https://yanxuan-item.nosdn.127.net/70151cfc794152f02dcdf7e2d8d95dae.jpg',
                    'https://yanxuan-item.nosdn.127.net/13565ff760acfd00d8504b59ce5fa4b3.jpg',
                    'https://yanxuan-item.nosdn.127.net/7024bcc2528e953952f017e7b39aa61f.jpg',
                    'https://yanxuan-item.nosdn.127.net/872436f61599f11e67883f29acaf584a.jpg',
                    'https://yanxuan-item.nosdn.127.net/6d16d5098d9892d7f8f6e22adb83ee99.jpg',
                    'https://yanxuan-item.nosdn.127.net/f71aca9261d8a434f288b709cbf9fd65.jpg'
                ],
                properties: [
                    {
                        name: '类型',
                        value: '收纳盒'
                    },
                    {
                        name: '功能',
                        value: '可折叠'
                    },
                    {
                        name: '适用季节',
                        value: '春、不限季节、冬、夏、春秋、其他、秋、四季'
                    },
                    {
                        name: '产地',
                        value: '中国大陆'
                    },
                    {
                        name: '材质',
                        value: '布'
                    },
                    {
                        name: '适用场景',
                        value: '客厅、卧室'
                    },
                    {
                        name: '面料',
                        value: '棉26%麻16%涤纶58%'
                    },
                    {
                        name: '安全技术',
                        value: 'GB18401-2010B类'
                    },
                    {
                        name: '温馨提醒',
                        value: '1.含有纸板的产品，避免水洗干洗，如有污渍，请用绞干的毛巾擦拭\n2.注意通风透气，保持干燥，避免潮湿'
                    }
                ]
            },
            isPreSale: false,
            isCollect: null,
            recommends: null,
            userAddresses: null,
            similarProducts: [
                {
                    id: '1131025',
                    name: '开发员自留款，带滚轮双层脏衣篓',
                    desc: '滚轮设计，双层收纳',
                    price: '125.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/8147e4685e5a0e47c1624772ee868fcc.jpg',
                    orderNum: 740
                },
                {
                    id: '1183010',
                    name: '给衣柜减减肥，真空防潮压缩袋',
                    desc: '手动压缩，节省空间',
                    price: '79.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/06461cea9e56b56dd4276e1cb81dd884.png',
                    orderNum: 572
                },
                {
                    id: '1252031',
                    name: '换季好帮手，大容量防尘衣物收纳袋',
                    desc: '棉被收纳，干净防尘',
                    price: '69.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/75f6cc2c037c09e957cbcc336cf4a652.png',
                    orderNum: 649
                },
                {
                    id: '1225018',
                    name: '可水洗的布艺收纳盒',
                    desc: '三种规格，收纳杂物',
                    price: '29.90',
                    picture: 'https://yanxuan-item.nosdn.127.net/5a608974e36c829898df20fd0ebf184a.png',
                    orderNum: 765
                }
            ],
            hotByDay: [
                {
                    id: '3996603',
                    name: '飞宇出游拍摄防抖神器手机稳定器',
                    desc: '小巧便携，三轴防抖，模式随心选',
                    price: '439.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/2d0a47a51fa4b3e3857f2010bd83bead.jpg',
                    orderNum: 897
                },
                {
                    id: '4023114',
                    name: 'KJE金属色系轻量电动车骑行盔男女通用',
                    desc: '3C认证，进口材料，安全出行',
                    price: '120.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/8f3a3b7dc6ca874f934b15af31417f61.png',
                    orderNum: 5439
                },
                {
                    id: '4023751',
                    name: '释放可爱天性，棉毛布造型领哈衣59-90cm',
                    desc: 'A类婴幼儿标准，安全放心',
                    price: '62.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/5e2b5629af983dadbceed483dd677eeb.jpg',
                    orderNum: 1521
                },
                {
                    id: '4027466',
                    name: '儿童气泵软底学步二阶段学步鞋',
                    desc: '气泵大底学步鞋',
                    price: '239.00',
                    picture: 'https://yanxuan-item.nosdn.127.net/19bedfd20a12842b5d7f7b909a62e877.jpg',
                    orderNum: 1260
                }
            ],
            evaluationInfo: {
                id: '1497122896173076482',
                orderInfo: {
                    specs: [],
                    quantity: 1,
                    createTime: null
                },
                member: null,
                score: 5,
                tags: null,
                content: '系统默认好评',
                pictures: null,
                officialReply: null,
                praiseCount: 813,
                createTime: '2022-02-25 16:14:48',
                praisePercent: 1
            }
        }
    }

    res.send(mock)
})
module.exports = router
