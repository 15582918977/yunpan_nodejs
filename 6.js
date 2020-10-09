var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var buf = new Buffer.alloc(1024);
var jsonFile = require('jsonfile')
const querystring = require("querystring");
let express = require('express');
var formidable = require('formidable')


console.log("server start")

http.createServer(function (req, res) {
    console.log("on server res")
    addCORSHeader(res)
    let isHandCORS = handleAllCORSOptions(req, res)
    if (isHandCORS) {
        return
    }


    var paramspath = url.parse(req.url, true).pathname;


    if (paramspath === '/login') {
        var params = url.parse(req.url, true).query;
        let user = params.user;
        let pwd = params.pwd;

        let loginRes = {
            status: 0,
            success: false
        }
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
    } else if (paramspath === '/homepage') {
        let filesList = {
            status: 0,
            success: false,
            data: null
        }
        jsonFile.readFile('filesList.json', function (err, jsonData) {
            if (err) {
                filesList.status = 1
            } else {
                filesList.success = true;
                filesList.data = jsonData;
                res.end(JSON.stringify(filesList));
            }
        });
    } else if (paramspath === '/addfile' && req.method.toLowerCase() === "post") {
        console.log("at addfile precess");
        addCORSHeader(res);
        // 处理上传的文件
        var form = new formidable.IncomingForm();
        form.uploadDir = 'D:\\Users\\喵喵叫的喵\\WebstormProjects\\learn1\\tmpFile'
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');


            let arr = files.file.path.split("\\");
            let name = files.file.name.split(".");
            let array = arr;
            let newarr = [];
            let uploadFileobject = {}

            for (let i = 0; i < array.length - 1; i++) {
                newarr.push(array[i]);
            }
            newarr = newarr.join("\\")

            let spotname = arr[arr.length - 1] + "." + name[name.length - 1];
            fs.rename(files.file.path, newarr + "\\" + spotname, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    uploadFileobject = {name: spotname, absolute_path: newarr + "\\" + spotname}

                    readFile('filesList.json', (err, content) => {
                        //
                        let fileListobj = JSON.parse(content)
                        fileListobj.push(uploadFileobject)
                        fs.writeFile('filesList.json', JSON.stringify(fileListobj, "", "\t"), function (err) {
                            if (err) {
                                res.status(500).send('Server is error...')
                            }
                        })
                    })

                    // fs.open('filesList.json', 'r+', function (err, fd) {
                    //     fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
                    //         let oldFileStr = "";
                    //         if (bytes > 0) {
                    //             oldFileStr = buf.slice(0, bytes).toString();
                    //         }
                    //         str += oldFileStr;
                    //         let old_obj = JSON.parse(oldFileStr)
                    //         old_obj.push(old_obj)
                    //
                    //         console.log(str)
                    //         fs.writeFile('filesList.json', JSON.stringify(old_obj), function (err) {
                    //             if (err) {
                    //                 res.status(500).send('Server is error...')
                    //             }
                    //         })
                    //     })
                    // })
                }
            });
            res.end(util.inspect({fields: fields, files: files}));
        });


    } else if (paramspath === '/filedelete' && req.method.toLowerCase() === "get") {
        addCORSHeader(res)
        console.log("at filedelete precess");

        var params = url.parse(req.url, true).query;
        let name = params.name;
        let deletedfiles = [];
        let filespath = "";


        readFile('filesList.json', function (err, content) {
            if (err) console.log(err)

            content = JSON.parse(content);
            content.forEach((v, i, arr) => {
                if (v.name === name) {
                    filespath=v.absolute_path;
                    deletedfiles = arr.splice(v, 1);
                    console.log(deletedfiles)
                    fs.writeFile('filesList.json', JSON.stringify(deletedfiles, "", "\t"), function (err) {
                        if (err) {
                            res.status(500).send('Server is error...')
                        } else {
                            res.end("success delete")
                        }
                    })
                    fs.unlink(filespath,function(err){
                        if(err) return console.error(err);
                        console.log("success delete");
                    })

                }
            });
        })


    } else if (paramspath === '/filechange' && req.method.toLowerCase() === 'get') {
        addCORSHeader(res);
        var params = url.parse(req.url, true).query;
        let name = params.name;
        let newname = params.newname;
        let newpath = [], newPath = [];
        readFile('filesList.json', function (err, content) {
            if (err) console.log(err)

            content = JSON.parse(content);
            content.forEach((v, i, arr) => {
                if (v.name === name) {
                    newpath = v.absolute_path.split("\\");
                    newpath[newpath.length - 1] = newname;
                    for (let i = 0; i < newpath.length; i++) {
                        newPath.push(newpath[i])
                    }
                    newPath = newPath.join("\\")
                    console.log(newPath);
                    fs.rename(v.absolute_path, newPath, (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.end("success change")
                        }
                    })
                }
            });
        })
    }else if(paramspath === '/filesearch' && req.method.toLowerCase() === 'get'){
        addCORSHeader(res);
        var params = url.parse(req.url, true).query;
        let name = params.name;

        readFile('filesList.json', function (err, content) {
            if (err) console.log(err)

            content = JSON.parse(content);
            content.forEach((v,i)=>{
                if (v.name === name) {
                    res.end(v.absolute_path);
                }
            });
        });


    }else if(paramspath === '/filesearch' && req.method.toLowerCase() === 'get'){

    } else {
        res.end("没有实现");
    }

}).listen(3001);


function handleAllCORSOptions(req, res) {
    if (req.method.toLowerCase() === "options") {
        res.end("");
        return true
    }
    return false
}

function addCORSHeader(res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By", ' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
}

/**
 *
 * @param path
 * @param callback  (err,string) -> void
 */
function readFile(path, callback) {
    fs.open(path, 'r+', function (err, fd) {
        if (err !== null) {
            callback(err, null)
            return
        }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err !== null) {
                callback(err, null)
                return
            }
            let fileStr = buf.slice(0, bytes).toString();
            callback(null, fileStr)
        })
    })
}