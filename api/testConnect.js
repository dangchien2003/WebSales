const express = require('express');
const router = express.Router();
const {connection} = require('../database/dbinfo')

    // http://127.0.0.1:3000/test/
    router.get('/:id', (req, res)=> {
        req.params.id
        var query;
        query = "insert into test1 values ('"+req.params.id+"')";
        connection.query(query, (error, results, fields) => {
            console.log(req.params.id);
        });

        query = 'select * from test1';
        connection.query(query, (error, results, fields) => {
            console.log(results);
            res.json(results);
        });
    })



module.exports = router;