const User = require('./../models/User.js');
const bcrypt = require('bcrypt');

const createUser = (username, password) => {
    bcrypt.hash(password, 10)
        .then(hash => {
            const user = new User({
                username, 
                password: hash,
            });
            return user.save();
        });
}

const authService = {
    createUser,
}

module.exports = authService;