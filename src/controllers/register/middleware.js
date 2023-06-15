const e = require('express');
const {
    connection
} = require('../../../config/config_mysql')

function checkExsit(req, res, next) {
    var user = req.body.user;
    let query = `select count(*) as count from accounts where user = '${user}'`;

    const promissCheckExsit = new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })

    var result = {
        error: '',
        message: '',
        exit: '',
        condition: ''
    }

    promissCheckExsit
        .then((results) => {
            if (results[0].count != 0) {
                result.exit = true;
                res.json(result)
            } else {
                next();
            }
        })
        .catch((error) => {
            result.message = 'error check exist';
            result.exit = true;
            res.status(500).json(result);
        })
}

function checkValidate(req, res, next) {
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

    var result = {
        exit: false,
        condition: true,
        condition_name: '',
    };

    for (let i = 0; i < regexs.length; i++) {
        if (!regexs[i].regex.test(regexs[i].data)) {
            result.condition = false;
            result.condition_name = regexs[i].data;
            res.json(result);
            break;
        }
        if (i === regexs.length - 1) {
            next();
        }
    }
}

function add(req, res, next) {
    let data = {
        user: req.body.user,
        password: req.body.password,
        rank: req.body.rank
    }

    // Lấy đối tượng Date hiện tại
    let currentTime = new Date();

    // Định dạng thời gian theo múi giờ của Việt Nam
    let options = {
        timeZone: 'Asia/Ho_Chi_Minh'
    };

    var timeNow = `${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDay()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

    let query = `insert into Accounts(user, password, rank, createdAt) values ('${data.user}', '${data.password}', ${data.rank}, '${timeNow}')`;

    const promissAddAccount = new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });

    promissAddAccount
        .then((result) => {
            res.json({
                error: false,
                message: '',
                success: true,
                createAt: timeNow,
            })
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).json({
                error: true,
                message: 'error add acccount',
                success: false,
                createAt: '',
            })
        });
}



module.exports = {
    checkExsit,
    checkValidate,
    add
}