class FormatDate {
    constructor(date = new Date()){
        this.date = date;
    }
    /**
     *格式化年月日时分秒
     * @param delimiterYMD  年月日的分隔符
     * @param delimiterHMS  时分秒的分隔符
     */
    formatAll(delimiterYMD='-',delimiterHMS=':'){
        let date = this.date;
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        month = month<10?('0'+month):month;
        day =  day<10?('0'+day):day;
        hour = hour<10?('0'+hour):hour;
        minute = minute<10?('0'+minute):minute;
        second = second<10?('0'+second):second;

        return `${year}${delimiterYMD}${month}${delimiterYMD}${day}  ${hour}${delimiterHMS}${minute}${delimiterHMS}${second}`
    }

    /**
     * 格式化年月日
     * @param delimiterYMD  年月日分隔符
     * @returns {string}
     */
    formatYMD(delimiterYMD='-'){
        let date = this.date;
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        month = month<10?('0'+month):month;
        day =  day<10?('0'+day):day;

        return `${year}${delimiterYMD}${month}${delimiterYMD}${day}`
    }

    /**
     * 格式化时分秒
     * @param delimiterHMS  时分秒的分隔符
     * @param hasSecond     有无秒
     * @returns {string}
     */
    formatHMS(delimiterHMS=':',hasSecond=true){
        let date = this.date;
        let hour = date.getHours();
        let minute = date.getMinutes();

        hour = hour<10?('0'+hour):hour;
        minute = minute<10?('0'+minute):minute;

        if(hasSecond){
            let second = date.getSeconds();
            second = second<10?('0'+second):second;
            return `${hour}${delimiterHMS}${minute}${delimiterHMS}${second}`
        }else{
            return `${hour}${delimiterHMS}${minute}`
        }
    }

}

module.exports = FormatDate;