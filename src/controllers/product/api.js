const express = require('express');
const router = express.Router();
const apiProduct = require('./middleware');

router.get('/:name', apiProduct);

module.exports = router;