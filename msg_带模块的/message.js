// 自定义的留言模块
const fs = require('fs')

const path = require('path')

// 数据库db.json的位置
const DB_PATH = path.join(__dirname, 'db.json')

let obj = {
    add(msgObj){
        console.log('本次要添加的留言',msgObj);

        // 1. 把之前的留言全读出来,转成数组
        let msgArr = this.get();
        console.log('之前所有的',msgArr);

        // 2. 数组中加msgObj对象
        msgArr.push(msgObj)
        // 3. 再把数组写入到db.json
        fs.writeFileSync(  DB_PATH , JSON.stringify( msgArr) )
        
    },
    get(){
        console.log('获取留言');
        // 读出db.json中内容，转成数组
        let msgStr = fs.readFileSync( DB_PATH )

        let msgArr = JSON.parse(msgStr)

        return msgArr
    }
}


// 导出模块的内容
module.exports = obj
