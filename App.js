var express = require('express');
//安装resquest模块
var app = express();

//设置Node.js跨域请求
app.use('*', function(req, res, next){
    //设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    //设置服务器支持的所有头信息
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    //设置服务器支持的所有跨域请求的方法
    res.header("Access-Content-Allow-Methods", "POST, GET");
    //next()方法进入下一个路由
    next();
});

//测试服务器是否请求成功
app.get('/', function(req, res){
    res.send('服务器监听成功!')
})
//获取电影列表
//通过node转接之后，就能直接访问豆瓣了
app.get('/getmovielist', function(req, res){
    //1.获取到客户端浏览器发送过来的电影类型
    var movieType = req.query.type;
    //2. 根据类型来请求数据,拼接豆瓣的url，
    var url = 'https://api.douban.com/v2/movie/'+movieType;
    //3.请求豆瓣api数据，并将请求回来的数据，转发给浏览器：使用request模块(github)，，
    var request = require('request');
    request(url, function (error, response, body) {
     // console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //body是真正获取过来的数据
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.send(body);
    });
//访问http://127.0.0.1:9999/getmovielist?type=in_theaters
//访问http://127.0.0.1:9999/getmovielist?type=coming_soon
//访问http://127.0.0.1:9999/getmovielist?type=top250
    // console.log(movieType)
    // res.send(movieType)//有res。send（body）就不需要（movieType）
})

//启动监听
app.listen(9999, '127.0.0.1', function(){
    console.log('Node服务器正在监听http://127.0.0.1:9999这个地址...')
})