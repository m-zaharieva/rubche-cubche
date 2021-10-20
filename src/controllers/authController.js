const router = require('express').Router();

const authService = require('./../services/authService.js');


const getRegisterPage = (req, res) => {
    res.render('auth/register');
};

router.get('/register', getRegisterPage);
router.post('/register', postRegisterPage);

module.exports = router;