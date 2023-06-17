const express = require('express');
const {
    checkValidate,
    responseApi
} = require('./middleware');
const router = express.Router();


router.get('/', function(req, res) {
    res.send('đăng ký');
})
router.post('/', checkValidate, responseApi);

module.exports = router;