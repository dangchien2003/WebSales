const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/test', require('./api/testConnect'));

//url 127.0.0.1:3000/login
app.use('/login', require('./api/login'));

const port = 3000
app.listen(port, () => console.log('127.0.0.1:',port))
