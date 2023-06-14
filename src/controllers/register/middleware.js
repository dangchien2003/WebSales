const {
    connection
} = require('../../../config/config_mysql')

function checkExsit(req, res, next) {
    var user = req.body.user;
    let query = `select count(*) as count from accounts where user = '${user}'`;

    connection.query(query, (error, result) => {
        if (error) res.status(500).json(error);
        if (result[0].count != 0) res.json({
            result: {
                exit: true,
                condition: true
            }
        })
        else next();
    })
}

function checkValidate(req, res, next) {
    let data = {
        user: req.body.user,
        password: req.body.password,
        rank: req.body.rank
    }
    let regexs = {
        user: /^[a-zA-Z0-9]{10,}$/,
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        rank: /^[1-9]{1,}$/
    };
    if (regexs.user.test(data.user) && regexs.password.test(data.password) && regexs.rank.test(data.rank)) next();
    else res.json({
        result: {
            exit: false,
            condition: false
        }
    });
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

    let timeNow = `${currentTime.getFullYear()}-${currentTime.getMonth()+1}-${currentTime.getDay()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

    let query = `insert into Accounts(user, password, rank, createdAt) values ('${data.user}', '${data.password}', ${data.rank}, '${timeNow}')`;
    connection.query(query, (error, result) => {
        if (error) {
            console.log(error.message);
            res.json({
                error: true,
                success: false
            })
        } else {
            res.json({
                error: false,
                success: true
            })
        }
    })
}



module.exports = {
    checkExsit,
    checkValidate,
    add
}