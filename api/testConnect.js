const express = require('express');
const router = express.Router();
const {pool} = require('../database/dbinfo')

router.get('/', async(req, res)=> {
    try {
        await pool.connect();
        const result = await pool.request().query('select * from zztest1');
        const test = result.recordset;
        res.json(test);
        console.log(test);
    }catch (e) {
        res.json(e)
    }
})

module.exports = router;