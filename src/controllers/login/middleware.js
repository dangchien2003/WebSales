const {
    connection
} = require('../../../config/config_mysql')

const resultsSv = {
    request: {
        fullInfo: "",
    },
    server: {
        error: "",
        message: "",
    },
    account: {
        blocked: "",
        exist: "",
        firstName: "",
        lastName: "",
    },

}

function checkRequest(req, res, next) {
    //console.log('checkRequest');

    req.resultsSv = resultsSv;
    if (req.body.user && req.body.password) {
        req.resultsSv.request.fullInfo = true;
        next();
    } else {
        req.resultsSv.request.fullInfo = false;
        res.json(req.resultsSv);
    }
}

function checkExist(req, res, next) {
    //console.log('checkExist');

    const query = `select count(*) as count from websales.accounts where User = '${req.body.user}' and Password = '${req.body.password}'`;

    connection.query(query, (error, results) => {
        if (error) {
            req.resultsSv.server.error = true;
            req.resultsSv.server.message = "error check exist account";
            console.log(error.message);
        } else {
            req.resultsSv.server.error = false;
            var count = results[0].count;
            if (count != 0) {
                req.resultsSv.account.exist = true;
                next();
            } else {
                req.resultsSv.account.exist = false;
                res.json(req.resultsSv)
            }
        }
    })
}


function checkBlocked(req, res, next) {
    //console.log('checkBlocked');

    const user = req.body.user;
    const blocked = 'true';
    const query = `select BINARY blocked as blocked from websales.accounts where User = '${user}'`;

    connection.query(query, (error, results) => {

        if (error) {
            console.log(error.message);

            req.resultsSv.server.error = true;
            req.resultsSv.server.message = "error check blocked account";
        } else {
            req.resultsSv.server.error = false;
            if (Boolean(results[0].blocked) === true) {
                console.log('block');

                req.resultsSv.account.blocked = true;
                res.json(req.resultsSv)
            } else {
                req.resultsSv.account.blocked = false;
                res.json(req.resultsSv)
            }
        }
    })
}

module.exports = {
    checkRequest,
    checkExist,
    checkBlocked
}