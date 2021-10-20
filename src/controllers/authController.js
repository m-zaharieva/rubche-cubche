const router = require('express').Router();

const authService = require('./../services/authService.js');


const getRegisterPage = (req, res) => {
    res.render('auth/register');
};

const postRegisterPage = async (req, res) => {
    try {
        let {username, password, repeatPassword } = req.body;
        await authService.registerUser(username, password, repeatPassword);
        res.redirect('/auth/login');

    } catch (error) {
        res.status(400).render('auth/register', {error: error.message})
    }
};

const getLoginPage = (req, res) => {
    res.render('auth/login');
};


router.get('/register', getRegisterPage);
router.post('/register', postRegisterPage);
router.get('/login', getLoginPage);
router.post('/login', postLoginPage);



module.exports = router;