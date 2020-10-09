var express = require('express')
var app = express()
var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var buf = new Buffer.alloc(1024);
var jsonFile = require('jsonfile')



let loginRes = {
    status: 0,
    success: false
}
let filesList = {
    status:0,
    success:false,
    data:null
}

//上传
console.log("addfile start")
app.post('/addfile',function(req,res){
    //将临时文件上传到/public/images中
    addCORSHeader(res)
    console.log("addfile")
    let output=fs.createWriteStream("D:\\Users\\喵喵叫的喵\\WebstormProjects\\learn1\\"+req.file.originalname)
    let input=fs.createReadStream(req.file.path)
    input.pipe(output)
    res.send("")
})

app.options('/addfile',function(req,res){
    addCORSHeader(res)
    res.send("")
})


app.post('/homepage', function (req, res) {
    addCORSHeader(res)
    jsonFile.readFile('filesList.json', function (err, jsonData) {
        if (err) {
            filesList.status = 1
        } else {
            filesList.success = true;
            filesList.data = jsonData;
            res.send(JSON.stringify(filesList));
        }
    });

})

app.get('/login', function (req, res) {



    var params = url.parse(req.url, true).query;
    let user = params.user;
    let pwd = params.pwd;

    jsonFile.readFile('input.json', function (err, jsonData) {
                if (err) {
                    loginRes.status = 1
                } else {
                    if (jsonData.user === user && jsonData.pwd === pwd) {
                        loginRes.success = true;
                        res.end(JSON.stringify(loginRes));
                    }
                }
            });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

function addCORSHeader(res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
}