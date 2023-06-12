const express = require('express');
const router = express.Router();
const {connection} = require('../database/dbinfo')


// connection.connect((error) => {
//     if (error) {
//         console.error('Error connecting to MySQL:', error);
//         return;
//     }
//     console.log('Connected to MySQL!');
// });

// connection.on('error', (error) => {
//     connection.end();
//     console.error('MySQL connection error:', error);
// });

// process.on('SIGINT', () => {
//     connection.end((error) => {
//         if (error) {
//             console.error('Error closing connection:', error);
//         }
//         console.log('Connection closed!');
//         process.exit();
//     });
// });


// http://127.0.0.1:3000/api/test1/
router.get('/', (req, res)=> {
    const query = 'select * from test1';
    connection.query(query, (error, results, fields) => {
        res.json(results);
    });
})


module.exports = router;