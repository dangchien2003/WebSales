const helper = require('../../until/helper');
const encryption = require('../../encryption/encryption');
const CODE = require('../../constants/code');
const token = require('../../authentication/index');

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
        id: sql[0].user
    }
}



async function responseApi(req, res, next) {
    const api = {};
    
    try {
        const timeAccessToken = 10*60;
        var accessToken = null; 
        var refreshToken = null; 
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


        // blocked 
        if(sql[0].blocked) {
            res.status(CODE.BLOCKED).json(api)
            return;
        }

        // no block
        if(api.account.id) {
            data_access = {
                user: api.account.id,
                blocked: !!sql[0].blocked,
                createAt: Date.now(),
                tokenDie: Date.now()+timeAccessToken*1000,
            }
            data_refresh = {
                user: api.account.id,
                createAt: Date.now(),
                rank: sql[0].rank,
            }
            accessToken = token.createToken(data_access, 'access_token', {path: '/', maxAge: 10*60});
            refreshToken = token.createToken(data_refresh, 'refresh_token', {path: '/'});

            try {
                var query_addtoken = `call insertToken('${sql[0].user}', '${accessToken.token}', '${refreshToken.token}')`;
                const tokenActioned = await helper.query(query_addtoken);
                console.log(tokenActioned);
            }catch(error) {
                console.log(error);
                api.error = {
                    message: error.message,
                }
                res.status(500).json(api)
                return;
            }

            res.cookie('ac_tk', accessToken);
            res.cookie('fr_tk', refreshToken);
            res.status(CODE.SUCCESS).json(api)
        }else {
            res.cookie('ac_tk', '');
            res.cookie('fr_tk', '');
            res.status(CODE.NOT_EXIST).json(api)
        }
        
    } catch (error) {
        console.log(error);
        api.error = {
            message: error.message,
        }
        res.status(500).json(api)
    }
    
}

module.exports = {
    responseApi
}