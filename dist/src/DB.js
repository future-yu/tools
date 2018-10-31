'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mysql = require('mysql');
/**
 * 封装常用数据库操作
 */

var DB = function () {
    function DB(config) {
        _classCallCheck(this, DB);

        this.pool = mysql.createPool(config);
    }

    /**
     * 通用查询
     * @param sql
     * @returns {Promise<any>}
     */


    _createClass(DB, [{
        key: 'query',
        value: function query(sql) {
            var pool = this.pool;
            return new Promise(function (resolve, reject) {
                pool.getConnection(function (err, connection) {
                    if (err) throw err;
                    connection.query(sql, function (error, results, fields) {
                        connection.release();
                        if (error) throw error;
                        resolve(results);
                    });
                });
            });
        }

        /**
         * 插入多个值
         * @param tableName 表名
         * @param keys      要插入的字段
         * @param values    字段值[[]]
         * @returns {Promise<any>}
         */

    }, {
        key: 'insertMany',
        value: function insertMany(tableName, keys, values) {
            var sql = this._formatInsertMany(tableName, keys, values);
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.query(sql).then(function (res) {
                    resolve(res);
                }).catch(function (err) {
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

    }, {
        key: 'insert',
        value: function insert(tableName, fields, value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                value = _this._formatSQLValue(value);
                var sql = 'INSERT INTO ' + tableName + '(' + fields.join(',') + ') VALUES (' + value.join(',') + ')';
                _this.query(sql);
            });
        }
        /**
         *
         * @param tableName 表名
         * @param keys      要插入的字段
         * @param values    字段值[[]]
         * @private
         */

    }, {
        key: '_formatInsertMany',
        value: function _formatInsertMany(tableName, keys, values) {
            var _this2 = this;

            var valuesArr = values.map(function (item) {
                item = _this2._formatSQLValue(item);
                return '\n                (' + item.join(',') + ')\n            ';
            });
            var sql = '\n            INSERT INTO \n            ' + tableName + '(' + keys.join(',') + ')\n            VALUES \n            ' + valuesArr.join(',') + '       \n        ';
            return sql;
        }

        /**
         * 格式化需要插入或更新的数据的格式
         * @param values
         * @private
         */

    }, {
        key: '_formatSQLValue',
        value: function _formatSQLValue(values) {
            return values.map(function (value) {
                if (typeof value === 'string') {
                    return '\'' + value + '\'';
                }
                if (value instanceof Date) {
                    return '\'' + value.toLocaleString() + '\'';
                }
                return value;
            });
        }
    }]);

    return DB;
}();

var config = {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'circle_review',
    timezone: '+08:00'
};

var db = new DB(config);
//# sourceMappingURL=DB.js.map