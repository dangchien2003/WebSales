const {
    connection
} = require('../../../config/config_mysql')

const initialResultsSv = {
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
        id: "",
        rank: "",
    },

}

// function openConnection() {
//     console.log('openConnection');
//     connection.connect(() => {});
// }

// function disConnection() {
//     console.log('disConnection');
//     connection.end();
// }

function checkRequest(req, res, next) {
    //console.log('checkRequest');
    req.resultsSv = {
        ...req.resultsSv, ...initialResultsSv
    };
    if (req.body.user && req.body.password) {
        req.resultsSv.request.fullInfo = true;
        next();
    } else {
        req.resultsSv.request.fullInfo = false;
        res.json(req.resultsSv);
    }
}

async function checkExist(req, res, next) {
    //console.log('checkExist');
    req.resultsSv = { ...req.resultsSv, ...initialResultsSv };
    const query = `select count(*) as count, rank, user AS id from websales.accounts where User = '${req.body.user}' and Password = '${req.body.password}'`;

    const promiseCheckExist = new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {

            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

    promiseCheckExist
        .then((results) => {
            req.resultsSv.server.error = false;
            const count = results[0].count;
            if (count !== 0) {
                req.resultsSv.account.exist = true;
                req.resultsSv.account.id = results[0].id;
                req.resultsSv.account.rank = results[0].rank;
                next();
            } else {
                req.resultsSv.account.exist = false;
                res.json(req.resultsSv);
            }
        })
        .catch((err) => {
            req.resultsSv.server.error = true;
            req.resultsSv.server.message = "error check exist account";
            console.log(err.message);
            res.status(500).json(req.resultsSv);
        })
}


function checkBlocked(req, res, next) {
    //console.log('checkBlocked');
    req.resultsSv = { ...req.resultsSv, ...initialResultsSv };
    const user = req.body.user;
    const query = `SELECT COUNT(*) AS count FROM websales.accounts WHERE User = '${user}' AND BLOCKED = 1`;


    const promiseCheckBlocked = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })

    promiseCheckBlocked
        .then((results) => {
            req.resultsSv.server.error = false;
            if (results[0].count !== 0) {
                //console.log('block');

                req.resultsSv.account.blocked = true;
                res.json(req.resultsSv)
            } else {
                //console.log('NOT BLOCKED');

                req.resultsSv.account.blocked = false;
                res.json(req.resultsSv)
            }
            //disConnection();
        })
        .catch((err) => {
            console.log(err.message);

            req.resultsSv.server.error = true;
            req.resultsSv.server.message = "error check blocked account";
            res.status(500).json(req.resultsSv)
            //disConnection();
        })
}

module.exports = {
    checkRequest,
    checkExist,
    checkBlocked
}