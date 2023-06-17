const express = require('express')

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

const port = 3000
app.listen(port, () => console.log('127.0.0.1:', port))