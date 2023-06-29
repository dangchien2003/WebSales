const router = require('express').Router();
require('dotenv').config({
    path: './dotenv/.env'
});

const encryption = require('./src/encryption/encryption');

const {
    query
} = require('./src/until/helper');


router.get('/', (req, res) => {

})

module.exports = router;