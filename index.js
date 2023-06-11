const express = require('express')

const port = 3000

const app = express()
app.use('/api/test', require('./api/testConnect'));

app.get('/trangchu', (req, res) => {
    res.send('trang chủ')
})

app.get('/trangchu', (req, res) => {
    res.send('trang chủ')
})

app.listen(port, () => console.log('127.0.0.1:',port))
