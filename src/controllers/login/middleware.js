const {connection} = require('../../../database/dbinfo')   

function checkRequest(req, res, next) {
    (req.body.user && req.body.password) ? next() : res.json(false)
}

function checkExist(req, res, next) {
    const query = `select count(*) as count from websales.accounts where User = '${req.body.user}' and Password = '${req.body.password}'`;
    connection.query(query, (error, results) => {
        var count = results[0].count;
        (count != 0)? res.json(true) : res.json(false)
    })
}

module.exports = {
    checkRequest, checkExist
}