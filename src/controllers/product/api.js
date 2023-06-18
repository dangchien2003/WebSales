const express = require('express');
const app = express();
const router = express.Router();
const {
    apiProduct,
} = require('./middleware');
const {
    apiProducts
} = require('./search/middleware')


router.get('/search/:key', apiProducts);

router.get('/:name', apiProduct);


module.exports = router;