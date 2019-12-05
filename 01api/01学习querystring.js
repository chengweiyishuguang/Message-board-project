// 如何把查询字符串转成对象 ？ 
// name=123&content=aaa

// 这是一个高频面试题，你自己先去找找答案。
// 我们，使用nodejs中的核心模块querystring，来解决这个问题

// const querystring = require('querystring')
// const qs = require('querystring')


// 格式
// 对象 = querystring.parse(查询字符串)

// let obj = querystring.parse('name=123&content=aaa')
// console.log(obj, obj.name, obj.content);
// // 解构赋值
// let { name, content } = obj;
// console.log(name, content);
//把查询字符串转成字符串

// const querystring = require('querystring');
//可以简写
// const qs = require('querystring');
// let obj = querystring.parse('name=123&content=aaa');
// let { name, content } = obj;
// console.log(name, content);