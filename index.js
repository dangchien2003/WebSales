const express = require('express')
require('dotenv').config({
    path: './dotenv/.env'
});


// begin test
const encryption = require('./src/encryption/encryption')
const {
    query
} = require('./src/until/helper');
// end test
const app = express()

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



//url 127.0.0.1:3000/login
app.use('/login', require('./src/controllers/login/api'));

//url 127.0.0.1:3000/register
app.use('/register', require('./src/controllers/register/api'));

//url 127.0.0.1:3000/trangchu
app.use('/trangchu', require('./src/controllers/homePage/api'));

//url 127.0.0.1:3000/product
app.use('/product', require('./src/controllers/product/api'));

//test
app.use('/', require('./test'));


app.use((req, res) => {
    res.json('đường dẫn không tồn tại');
})

const port = 3000
app.listen(port, () => console.log('127.0.0.1:', port))