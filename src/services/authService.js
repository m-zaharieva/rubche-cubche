const bcrypt = require('bcrypt');

const User = require('./../models/User.js');
const { jwtSign } = require('./../utils/jwtUtils.js');
const { SECRET } = require('./../constants.js');


const registerUser = (username, password, repeatPassword) => {
    return User.create({ username, password, repeatPassword});
};

const loginUser = (username, password) => {
    
    return findUser(username)
        .then(user => {
            let isValid = bcrypt.compare(password, user.password);
            return Promise.all([isValid, user]);
        })
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            }
        })
        .catch(() => {
            return null;
        });
}

const createToken = function (user) {
    let payload = {
        _id: user._id,
        username: user.username,
    };

    return jwtSign(payload, SECRET);
}

const findUser = (username) => {
    return User.findOne({ username });
}


const authService = {
    registerUser,
    loginUser,
    createToken,
}

module.exports = authService;