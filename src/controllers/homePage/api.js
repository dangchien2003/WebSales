const express = require('express');
const router = express.Router();
const {apiProducts, urlHaventPage} = require('./middleware');



router.get('/page/:page',apiProducts);
router.get('/page',urlHaventPage);

module.exports = router;