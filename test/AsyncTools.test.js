describe('异步工具方法测试',()=>{
    const  AsyncTools = require('../src/AsyncTools');
    it('超时提示', function () {
        let getData = new Promise((resolve)=>{
           setTimeout(()=>{
               resolve('success');
           },200)
        });

        AsyncTools.asyncTimeout(getData,400).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    });
});