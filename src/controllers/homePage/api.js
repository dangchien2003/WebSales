const express = require('express');
const router = express.Router();
const {apiProducts, urlHaventPage} = require('./middleware');



router.get('/',apiProducts);

module.exports = router;