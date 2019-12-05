// 目标：
// 地址：localhost:8000/post

// 功能：获取用户传入的参数，并以json字符串格式返回，在返回的信息中要加上时间戳.

const http = require('http')
const qs = require('querystring')

const server = http.createServer((req, res) => {
    if (req.url === "/post" && req.method === "POST") {
        // 如何接收 post的传参？
        let result = ""
            // 事件监听
            // req.on(事件名，回调)
        req.on('data', function(rs) {
            // 每次收到一部分数据就会触发一次这个事件，
            // 回调函数也会相应的执行一次。
            // 其中的rs是一个形参，它的类型是一个buffer，它表示本次收到的这一部分数据。
            console.log("收到了一部分数据：");
            console.log(rs);
            result = result + rs; // 隐式转换。把buffer转成字符串
        })

        req.on('end', function() {
            // 全部的数据都接收完成后，这个回调会执行一次！
            console.log("全部数据接收完成");
            // console.log(result); // result就是用户传入的参数。是查询字符串格式 
            // 如何把查询字符串转成对象 ？ 
            // name=123&content=aaa
            let obj = qs.parse(result)
                // 按接口要求，补充一个时间戳
            obj._t = Date.now();
            // 返回这个对象obj
            console.log(obj);

            // 设置响应头：告诉浏览器本次返回的数据是json数据
            res.setHeader('content-type', 'application/json;charset=utf8')

            res.end(JSON.stringify(obj))
        })
    } else {

        res.end('err')
    }
})

server.listen(8000, () => {
    console.log(8000);

})