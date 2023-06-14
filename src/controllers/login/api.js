const express = require('express');
const router = express.Router();

const {
    checkRequest,
    checkExist,
    checkBlocked
} = require('./middleware');

//get http://127.0.0.1:3000/login/
router.get('/', (req, res) => {
    res.send("trang login")
})

//post http://127.0.0.1:3000/login/
router.post('/', checkRequest, checkExist, checkBlocked)




module.exports = router;