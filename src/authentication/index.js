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

function checkToken(access_token, refresh_token) {
    dataToken = [access_token, refresh_token];
    for(let i = 0; i < dataToken.length; i++) {
        dataToken[i] = encryption.verifyToken(dataToken[i]);
    }

    if((dataToken[0].data && dataToken[1]).data) {
        if(dataToken[0].user == dataToken[1].user && dataToken[0].createdAt > Date.now()) {
            return dataToken;
        }
    }else {
        return false;
    }
}

function checkPermission(User_) {

}

module.exports = {
    createToken,
    checkToken,
    checkPermission,
}