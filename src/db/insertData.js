const mysql = require('mysql')

// 创建数据库连接
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})

// 连接到数据库
connection.connect((err) => {
    if (err) {
        console.error('数据库连接失败：', err)
        return
    }
    console.log('成功连接到数据库')
})

const data = [
    {
        id: '10924232021',
        name: '经典2格子元素，男童加绒格子衬衫',
        desc: '经典格子元素，翻盖小贴袋装饰',
        price: '125.00',
        picture: 'https://yanxuan-item.nosdn.127.net/084f82c43a71bbc4d280fbb09a47a028.jpg',
        orderNum: 3342,
        subType_id: 109243022
    },
    {
        id: '10924322021',
        name: '趣味小恐龙绣花，男童灯芯绒衬衫',
        desc: '趣味小恐龙绣花，满版老虎印花，5色可选',
        price: '89.00',
        picture: 'https://yanxuan-item.nosdn.127.net/e68d406a58622a8d850de442aacfcf2e.jpg',
        orderNum: 1617,
        subType_id: 109243022
    }
]

data.forEach((item) => {
    const sql = 'insert into goodssort_children_goods set ?'
    connection.query(sql, item, (err, results) => {
        if (err) return console.log(err.message)
        console.log('插入成功')
    })
})

// 关闭数据库连接
connection.end()
