const express = require('express');
const router = express.Router();

const {checkRequest, checkExist} = require('../middleware/login/login');



//post http://127.0.0.1:3000/login/
router.post('/',checkRequest, checkExist)




module.exports = router;