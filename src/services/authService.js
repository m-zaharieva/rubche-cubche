const User = require('./../models/User.js');



const registerUser = (username, password, repeatPassword) => {
    return User.create({ username, password, repeatPassword });
};

const loginUser = (username, password) => {

}


const authService = {
    registerUser,
}

module.exports = authService;