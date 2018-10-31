// function* f() {
//     let res = yield new Promise((resolve)=>{
//         setTimeout(()=>{
//             resolve(1)
//         })
//     })
// }
//
//
// let ff = f();
//
//
// ff.next().value.then(res=>{console.log(res)});



const  fs = require('fs');
let buffer = Buffer.alloc(8);

fs.open('./1.txt','r',function (err,fd) {
    if(err){
        console.log(err);
    }
    function readFile(len,total) {
        fs.read(fd,buffer,0,buffer.length,total,function (err,bytesRead, buf) {
            if(len>0){

                console.log(buf.toString());
               readFile(bytesRead,total+bytesRead);
            }
        })
    }
    readFile(1,0);
});