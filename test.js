const router = require('express').Router();
require('dotenv').config({
    path: './dotenv/.env'
});

const encryption = require('./src/encryption/encryption');

const {
    query
} = require('./src/until/helper');


router.get('/', (req, res) => {
    
    a = {
        abc: 3333,
    }

    res.json(a['abc'])
})

module.exports = router;