const https = require('http');
const fs = require('fs');

fs.open('input.txt','w+',function(err){
    if(err){
        console.log(err)
    }
})

const options = {
    hostname:'www.baidu.com',
    port:80,
    path:'/',
    method:'GET'
}
let str ='';
const req = https.request(options,res=>{

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