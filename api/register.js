const express = require('express');
const {checkExsit, checkValidate, add} = require('../middleware/register/register');
const router = express.Router();


router.get('/', function(req, res){
    res.send('đăng ký');
})
router.post('/', checkExsit, checkValidate, add);

module.exports = router;
