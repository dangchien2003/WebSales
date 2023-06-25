const helper = require('../../until/helper');

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

    const api = {};
    try {
        // check full info
        api.request = checkRequest(req);
        if (!checkRequest(req).fullInfo) {
            res.json(api);
            return;
        }

        const query = `select count(user) as count, rank, blocked, user from websales.accounts where user = '${req.body.user}' and Password = '${req.body.password}'`;

        // promise => result query
        const sql = await helper.query(query);

        // add value to api
        covertApiAccounts(sql, api);

        res.json(api)
    } catch (error) {
        api.error = {
            message: error.message,
        }
        res.status(500).json(api)
    }
}

module.exports = {
    responseApi
}