class AsyncTools {

    /**
     * 封装异步调用超时
     * @param func    异步操作
     * @param timeout 超时时间
     */
    static asyncTimeout(func,timeout){
        return Promise.race([func,new Promise(resolve=>{
            setTimeout(()=>{
                resolve({
                    code:408,
                    msg:'请求超时'
                });
            },timeout);
        })]);
    };
}


module.exports = AsyncTools;