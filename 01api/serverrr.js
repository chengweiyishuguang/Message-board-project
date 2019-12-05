// 目标：
// 地址：localhost:8000/post
// 功能：获取用户传入的参数，并以json字符串格式返回，在返回的信息中要加上时间戳.
//先搭建结构
//引入模块
const http = require('http')
const qs = require('querystring')



//创建服务



// const server = http.createServer(function(req, res) {

//     if (req.url === "/post" && req.method === 'POST') {
//         // 事件监听
//         // 变量接收每次触发后的一部分数据
//         var result = '';
//         // post 事件传参数需要两个事件一个是data,一个是end
//         req.on('data', function(rs) {
//                 //每次收到一部分数据都会触发这个函数
//                 //回调函数也会相应的执行一次
//                 //其中rs是形参它表示本此收到的一个数据 
//                 // result += rs;
//                 console.log('收到了一部分数据:数据如下');
//                 console.log(rs);
//                 result += rs;

//             })
//             //end事件服务器接收post参数完毕之后，就会执行的事件
//         req.on('end', function() {
//             console.log('服务器接收post参数完毕');
//             console.log(result); //这个就是用户传入的参数并且是查询字符串格式的
//             //用qs下面的parse方法把result的数据转成对象格式
//             let obj = qs.parse(result);
//             //按接口要求补充一个时间戳
//             obj._t = Date.now()
//             console.log(obj);
//             //返回数值为 { name: '123', content: 'aaa' }
//             //用解构赋值取出里面的值
//             //end要放在所以数据处理完之后
//             //end里面只能放字符串或者buffer格式我们现在要把对象放回去所以需要把对象转成字符串
//             //设置响应头告诉浏览器我这一段是要响应JSON数据
//             res.setHeader('content-type', 'application/json;charset=utf8')

//             res.end(JSON.stringify(obj))
// //post接口数据在请求体里面，如果不传参数就没有请求体
//         })

//     } else {
//         res.end('err')
//     }

// })

// //启动服务
// server.listen(8000, function() {
//     console.log(8000);
// })