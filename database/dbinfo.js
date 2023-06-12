// 
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'websales',
    port: 3307
});

module.exports = {
    connection,
}