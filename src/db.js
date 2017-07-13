/**
 * Created by mr.xie on 2017/7/13.
 */
const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool(config.db);
module.exports = pool;


