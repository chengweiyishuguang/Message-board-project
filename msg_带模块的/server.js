// 1.实现getmsg接口
// 2.实现addmsg接口
// 3.静态资源

const http = require('http')

const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

// 引入自定义模块
const message = require('./message')

// console.log(message);
const server = http.createServer( (req,res)=>{
    // consoles.log(req.url );
    // req.url :  /getmsg?_=1234324224324
    // 只要 /getmsg。
    // 通过url.parse('/getmsg?_=1234324224324') ====> {pathname:'/getmsg'}

    let {pathname} = url.parse(req.url)

    if(req.method === 'GET' && pathname === '/getmsg'){
        // 1. 去db.json中读出内容
        let result = message.get();

        // 2.按接口指定的格式，对数据进行包装
        let obj = {code:200, msg: '获取成功',data: result}

        res.setHeader('content-type','application/json;charset=utf8')
        // 3. 返回数据
        res.end( JSON.stringify( obj)  )
        
    } 
    
    else if( req.method === 'POST' && pathname === '/addmsg' ){
        // 添加留言
        //两件事件，收集参数
        let result = ''
        req.on('data', rs =>{
            result = result + rs;
        })
        req.on('end',() => {
            let {name,content} = qs.parse(result);
            console.log(name,content);
            // 1. 收集参数，组成对象msgObj
            let msgObj = {
                dt:Date.now(),
                name,
                content
            }

            // 2. 调用模块的方法，添加留言
            message.add( msgObj )

            
            let obj = {code:200, msg:'添加成功',data: msgObj}
            res.setHeader('content-type','application/json;charset=utf8')
            // 3. 返回数据
            res.end( JSON.stringify( obj)  )
        
        })
    }
    else {
        // 去public下读出本次请求的文件，并返回
        // /index.html ----> public/index.html
        let filePath = path.join(__dirname , 'public', pathname)
        console.log( pathname , filePath);
        fs.readFile(filePath,(err,data) => {
            if(err){
                res.statusCode = 404
                res.end('not found')
            } else {
                res.end(data)
            }
        })
        
    }

})
server.listen(8000,()=>{
    console.log(8000);
    
})
