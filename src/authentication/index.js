const encryption = require('../encryption/encryption');

function createToken(data, category) {
    const time = {
        access_token: 10*60,
        refresh_token: 365*24*60*60,
    }

    var lifeTime = 0;

    switch(category) {
        case 'refresh_token': 
            lifeTime = time.refresh_token;
            break;
        case 'access_token':
            lifeTime = time.access_token;
            break;
    }
   return encryption.signToken(data, lifeTime);
}

module.exports = {
    createToken,
}