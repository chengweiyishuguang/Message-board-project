// 1.实现getmsg接口
// 2.实现addmsg接口
// 3.静态资源
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

const server = http.createServer(function(req, res) {
    let { pathname } = url.parse(req.url);

    if (req.method === 'GET' && pathname === '/getmsg') {
        //去存放数据的json文件中读出数据放到data里面
        //读取内容先引入fs模块
        //读文件需要绝对地址，所以先把地址转一下，先引入path模块,拼接地址
        let filepath = path.join(__dirname, 'DB1.json')
            //1读出文件
        fs.readFile(filepath, 'utf8', function(err, data) {
                if (err) {
                    //如果读取失败显示404，读取失败
                    res.statusCode = 404;
                    res.end('读取失败');
                } else {
                    //按接口指定格式进行包装
                    //如果成功，返回数据,把读取成功的数据放到data里面，读取出来的文件是字符串格式，要转换成对象格式
                    let obj = { code: 200, msg: '获取成功', data: JSON.parse(data) }
                    console.log(data);
                    console.log(typeof data); //string类型

                    //设置响应头告诉浏览器数据格式为json

                    res.setHeader('content-type', 'application/json;charset=utf8')
                        //res.end里面必须放字符，要把数据转成字符串放到end里面

                    res.end(JSON.stringify(obj))

                }

            })
            // 2.实现addmsg接口
    } else if (req.method === 'POST' && pathname === '/addmsg') {

        //post接口需要触发两个事件一个是on('data'),一个是on('end')
        //由于on('data')事件的数据是一部分一部分加载，所以我们要设置一个变量接收它
        //收集数据
        var result = '';
        req.on('data', function(rs) {
            //rs里面是加载的那一部分数据，把它放到页面里面储蓄
            result += rs
        })
        req.on('end', function() {
            //数据全部加载完成执行
            console.log(result);
            //传回数据是查询字符串格式，转成对象添加时间戳，先引入querystring模块
            let { name, content } = qs.parse(result)
            console.log(name, content);
            //给对象添加时间戳
            let msjobj = {
                    dt: Date.now(),
                    name,
                    content
                }
                //读入DB1.json
            let msgstr = fs.readFileSync(path.join(__dirname, 'DB1.json'), 'utf8', )
            console.log(msgstr);
            //字符串转数组
            let msgarr = JSON.parse(msgstr);
            //数组中追加obj
            msgarr.push(msjobj)
                //写回DB1.json数组转回字符串
            fs.writeFileSync(path.join(__dirname, 'DB1.json'), JSON.stringify(msgarr))
                //设置响应头告诉浏览器数据格式为json
            res.setHeader('content-type', 'application/json;charset=utf8')
                //结束请求返回
            let obj = { code: "200", msg: "添加成功", data: msgarr }
                //res.end里面必须放字符，要把数据转成字符串放到end里面
            res.end(JSON.stringify(obj))
        })

    } else {
        // 去public下读出本次请求的文件，并返回
        // /index.html ----> public/index.html
        //读文件需要绝对路径
        let filepath = path.join(__dirname, 'public', pathname)
        console.log(filepath, pathname);
        fs.readFile(filepath, function(err, data) {
            if (err) {
                res.statusCode = 404;
                res.end('not find')

            } else {
                res.end(data)
            }

        })


    }
})
server.listen(8000, function() {
    console.log(8000);

})