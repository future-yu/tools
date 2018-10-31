describe('格式化日期的测试',()=>{
    const FormatDate = require('../src/FormatDate');
    let date = new FormatDate();
    it('格式化现在的时间(年月日时分秒)',()=>{
         console.log(date.formatAll('-',':'));
    });

    it('格式化现在的时间(年月日)',()=>{
        console.log(date.formatYMD('-'));
    });

    it('格式化现在的时间(时分秒)',()=>{
        console.log(date.formatHMS(':'));
    });

    it('格式化现在的时间(时分)',()=>{
        console.log(date.formatHMS(':',false));
    });
});

