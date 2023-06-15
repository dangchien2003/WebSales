const {
    connection
} = require('../../../config/config_mysql')

function checkRequest(req) {
    if (req.body.user && req.body.password) {
        return {
            fullInfo: true
        };
    } else {
        return {
            fullInfo: false
        };
    }
}


function covertApiAccounts(sql, api) {
    api.account = {
        exist: !!sql[0].count,
        id: sql[0].user,
        rank: sql[0].rank,
        blocked: !!sql[0].blocked,
    }
}
async function responseApi(req, res, next) {
    console.log("🚀 ~ file: middleware.js:27 ~ responseApi ~ req:", req.body)
    
    const api = {};
    try {
        // check full info
        api.request = checkRequest(req);
        if (!checkRequest(req).fullInfo) {
            res.json(api);
            return;
        }

        const query = `select count(user) as count, rank, blocked, user from websales.accounts where user = '${req.body.user}' and Password = '${req.body.password}'`;

        console.log("🚀 ~ file: middleware.js:40 ~ responseApi ~ query:", query)
        // promise => result query
        const sql = await new Promise((resolve) => {
            connection.query(query, function(err, results) {
                resolve(results);
            });
        })

        // add value to api
        covertApiAccounts(sql, api);

        res.json(api)
    } catch(error) {
        api.error = {
            message: error.message,
        }
        res.status(500).json(api)
    }
}

module.exports = {
    responseApi
}