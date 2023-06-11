// 
const mssql = require('mssql');

const SQL_DRIVER = 'SQL Server';
const SQL_SERVER = 'DANGCHIEN\\SQLEXPRESS';
const SQL_UID = 'DANGCHIEN\\chien';
const SQL_PASSWORD = '';
const SQL_DATABASE = 'WebSales';


const config = {
    driver: SQL_DRIVER,
    server: SQL_SERVER,
    user: SQL_UID,
    password: SQL_PASSWORD,
    database: SQL_DATABASE,
    options: {
        encrypt: false,
        enableArithAbort: false,
    },
    connectionTimeout: 30000,
    requestTimeout: 30000,
    pool: {
        idleTimeoutMillis: 30000,
        max: 100,
    },
};

const pool = new mssql.Pool(config);

module.exports = {
    pool,
}