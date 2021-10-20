const router = require('express').Router();

const authService = require('./../services/authService.js');


const getRegisterPage = (req, res) => {
    res.render('auth/register');
};

const postRegisterPage = (req, res) => {
    let {username, password, repeatPassword } = req.body;
    let user = authService.createUser(username, password);
    res.redirect('/auth/login');
};

router.get('/register', getRegisterPage);
router.post('/register', postRegisterPage);
router.get('/login', getLoginPage);
router.post('/login', postLoginPage);

module.exports = router;