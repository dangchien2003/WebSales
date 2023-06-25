const helper = require('../../until/helper');



function checkValidate(req, res, next) {
    const api = {}

    try {
        let regexs = [
            user = {
                data: req.body.user,
                regex: /^[a-zA-Z0-9]{10,}$/,
            },
            password = {
                data: req.body.password,
                regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            },
            rank = {
                data: req.body.rank,
                regex: /^[1-9]{1,}$/,
            },
        ];

        for (let i = 0; i < regexs.length; i++) {
            if (!regexs[i].regex.test(regexs[i].data)) {
                api.condition = false;
                api.condition_name = regexs[i].data;
                res.json(api);
                break;
            }
            if (i === regexs.length - 1) {
                next();
            }
        }
    } catch (err) {
        console.log(err);
        api.server = 'error checkValidate';
        res.status(500).json(api);
    }
}


async function responseApi(req, res, next) {
    const api = {};

    try {
        const user = req.body.user;
        const password = req.body.password;
        const rank = req.body.rank;

        const currentTime = new Date();
        const timeNow = `${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDay()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

        var query = `INSERT INTO websales.accounts (websales.accounts.user, websales.accounts.password, websales.accounts.rank, websales.accounts.createdAt)
        SELECT '${user}', '${password}', ${rank}, '${timeNow}'
        FROM dual
        WHERE NOT EXISTS (
          SELECT user FROM websales.accounts WHERE websales.accounts.user = '${user}'
        )`

        // promiss => results query
        const insert = await helper.query(query);


        // insert ok? id|time insert : exsit|timeRequest
        if (insert.affectedRows != 0) {
            api.success = {
                id: user,
                createdAt: timeNow
            }
        } else {
            api.success = {
                exist: true,
                timeRequest: timeNow
            }
        }

        res.json(api)
    } catch (error) {
        console.log(error);
        api.server = 'error insert account';
        res.status(500).json(api);
    }
}

module.exports = {
    checkValidate,
    responseApi
}