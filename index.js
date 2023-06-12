const express = require('express')

const port = 3000

const app = express()


app.use('/api/test', require('./api/testConnect'));
app.use('/api/test1', require('./api/dangnhap'));


app.get('/trangchu',  (req, res) => {
    connection.connect();

    const query = 'select * from test1';
    connection.query(query, (error, results, fields) => {
        res.json(results);
    });

    connection.end(() => console.log("end"));
})


app.listen(port, () => console.log('127.0.0.1:',port))
