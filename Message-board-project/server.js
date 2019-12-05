// 1.实现getmsg接口
// 2.实现addmsg接口
// 3.静态资源

const http = require('http')

const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')

const server = http.createServer( (req,res)=>{
    // consoles.log(req.url );
    // req.url :  /getmsg?_=1234324224324
    // 只要 /getmsg。
    // 通过url.parse('/getmsg?_=1234324224324') ====> {pathname:'/getmsg'}

    let {pathname} = url.parse(req.url)

    if(req.method === 'GET' && pathname === '/getmsg'){
        // 1. 去db.json中读出内容
        fs.readFile(path.join(__dirname, 'db.json'), 'utf8',function(err,result){
            if(err){

            }else {
                console.log( result ) // 从文件中读出的是字符串。
                console.log(typeof result) // 把它转成json对象
                
                //2.按接口指定的格式，对数据进行包装
                let obj = {code:200, msg: '获取成功',data: JSON.parse(result)}

                res.setHeader('content-type','application/json;charset=utf8')
                // 3. 返回数据
                res.end( JSON.stringify( obj)  )

            }
        })
    } 
    
    else if( req.method === 'POST' && pathname === '/addmsg' ){
        // 添加留言
        //两件事件，收集参数
        let result = ''
        req.on('data',function(rs){
            result = result + rs;
        })
        req.on('end',function(){
            let {name,content} = qs.parse(result);
            console.log(name,content);
            // 1. 收集参数，组成对象msgObj
            let msgObj = {
                dt:Date.now(),
                name,
                content
            }

            //2. 读入文件
            let msgStr = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')
            console.log(msgStr);
            //3.转成数组
            let msgArr = JSON.parse( msgStr )
            //4.数组中添加msgObj
            msgArr.push( msgObj )

            // 5.6 写入文件
            fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(msgArr))

            
            let obj = {code:200, msg:'添加成功',data: msgObj}
            res.setHeader('content-type','application/json;charset=utf8')
            // 7. 返回数据
            res.end( JSON.stringify( obj)  )
        
        })
    }
    else {
        // 去public下读出本次请求的文件，并返回
        // /index.html ----> public/index.html
        let filePath = path.join(__dirname , 'public', pathname)
        console.log( pathname , filePath);
        fs.readFile(filePath,function(err,data){
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
