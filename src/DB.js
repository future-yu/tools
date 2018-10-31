var mysql = require('mysql');
/**
 * 封装常用数据库操作
 */
class DB {
    constructor(config){
        this.pool = mysql.createPool(config);
    }


    /**
     * 通用查询
     * @param sql
     * @returns {Promise<any>}
     */
    query(sql){
        let pool = this.pool;
        return new Promise((resolve,reject)=>{
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(sql, function (error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    resolve(results);
                });
            });
        })
    }

    /**
     * 插入多个值
     * @param tableName 表名
     * @param keys      要插入的字段
     * @param values    字段值[[]]
     * @returns {Promise<any>}
     */
    insertMany(tableName,keys,values){
        let sql = this._formatInsertMany(tableName,keys,values);
        let _this = this;
        return new Promise((resolve,reject)=>{
           _this.query(sql).then((res)=>{
               resolve(res);
           }).catch((err)=>{
               reject(err);
           });
        });

    }

    /**
     * 插入一个值
     * @param tableName
     * @param fields
     * @param value
     * @returns {Promise<any>}
     */
    insert(tableName,fields,value){
        let _this =this;
        return new Promise((resolve,reject)=>{
            value = _this._formatSQLValue(value);
            let sql = `INSERT INTO ${tableName}(${fields.join(',')}) VALUES (${value.join(',')})`;
            _this.query(sql)
        })
    }
    /**
     *
     * @param tableName 表名
     * @param keys      要插入的字段
     * @param values    字段值[[]]
     * @private
     */
    _formatInsertMany(tableName,keys,values){
        let valuesArr = values.map((item)=>{
            item = this._formatSQLValue(item);
            return `
                (${item.join(',')})
            `;
        });
        let sql = `
            INSERT INTO 
            ${tableName}(${keys.join(',')})
            VALUES 
            ${valuesArr.join(',')}       
        `;
        return sql;
    }

    /**
     * 格式化需要插入或更新的数据的格式
     * @param values
     * @private
     */
    _formatSQLValue(values){
        return values.map((value)=>{
            if(typeof value === 'string'){
                return `'${value}'`;
            }
            if(value instanceof Date){
                return `'${value.toLocaleString()}'`;
            }
            return value;
        });
    }
}

let config = {
    port:3306,
    host:'localhost',
    user:'root',
    password:'123456',
    database:'circle_review',
    timezone: '+08:00'
};

let db = new DB(config);



























