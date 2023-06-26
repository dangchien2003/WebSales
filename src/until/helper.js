const {
    connection
} = require('../../config/config_mysql');

function query(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) return reject(err)
            resolve(result);
        })
    })
}

module.exports = {
    query
};