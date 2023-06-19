const express = require('express');
const app = express();
const router = express.Router();
const {
    apiProduct,
} = require('./middleware');
const {
    apiProducts
} = require('./search/middleware')

const {apiCart} = require('./cart/middleware')


// post 127.0.0.1:3000/product/addcart
router.post('/addcart', apiCart)

// get 127.0.0.1:3000/product/search
router.get('/search/:key', apiProducts);

//get 127.0.0.1:3000/product/
router.get('/:name', apiProduct);



module.exports = router;