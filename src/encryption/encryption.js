const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: '../../dotenv/.env'
});

function getSecretKey() {
    const secretKey = process.env.JWT_PASSWORD;
    return stringToHex(secretKey);
}

function signToken(data, expiresIn = null) {
    var token = null;
    var error = null;
    try {
        if (expiresIn) {
            token = jwt.sign(data, getSecretKey(), {
                expiresIn
            });
        } else {
            token = jwt.sign(data, getSecretKey());
        }
    }catch(err) {
        error = err
    }
    return {token, error};
}

function verifyToken(token) {
    try {
        const data = jwt.verify(token, getSecretKey());
        return {data};
    }catch(error){
        return {error}
    }
}

function stringToHex(string) {
    return bufferToHex(stringToBuffer(string));
}

function hexToString(hex) {
    return bufferToString(hexToBuffer(hex));
}

function bufferToString(buffer) {
    // buffer to string
    return buffer.toString('utf8');
}

function stringToBuffer(string) {
    // string to buffer
    return Buffer.from(string, 'utf8');
}

function hexToBuffer(hex) {
    // hex to byte
    return Buffer.from(hex, 'hex');
}

function bufferToHex(buffer) {
    // buffer to hex
    return buffer.toString('hex');
}



module.exports = {
    signToken,
    verifyToken,
    stringToHex,
    hexToString,
    hexToBuffer,
    bufferToHex,
    bufferToString,
    stringToBuffer,
};