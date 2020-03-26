'use strict';
const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'aba',
    password: '',
    database: 'lugo_erp'
});

pool.getConnection(function(error) {
    // console.log(error);
    if (error) {
        console.log('---> Error to connect with Database: \n' + error);
        return;
    }
    console.log('---> Connected to Database!');
});
//promisify pool querys

pool.query = promisify(pool.query);

module.exports = pool;
