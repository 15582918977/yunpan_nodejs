const http = require('http');
const fs = require('fs');

fs.open('input.txt','w+',function(err){
    if(err){
        console.log(err)
    }
})

let promise = new Promise(function(resolve,reject){
    const req = http.request(options,res=>{

        res.on('data',function(){
            resolve(res);
        })

        res.on('err',function(err){
            reject(err);
        })

        res.on('end',function(){
            console.log(str)
            fs.writeFile('input.txt',str,function(err){
                if(err){
                    // console.log(err);
                }
            })
        })

    })
});

promise.then(function(res){
    str += res.toString();
})


const options = {
    hostname:'www.baidu.com',
    port:80,
    path:'/',
    method:'GET'
}
let str ='';
const req = http.request(options,res=>{

    res.on('data',d =>{
        str += d.toString();
    })

    res.on('end',function(){
        console.log(str)
        fs.writeFile('input.txt',str,function(err){
            if(err){
                // console.log(err);
            }
        })
    })
})


req.end()