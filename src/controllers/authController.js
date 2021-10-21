const router = require('express').Router();

const authService = require('./../services/authService.js');
const { TOKEN_COOKIE_NAME } = require('./../constants.js');



const getRegisterPage = (req, res) => {
    res.render('auth/register');
};

const postRegisterPage = async (req, res) => {
    try {
        let { username, password, repeatPassword } = req.body;
        await authService.registerUser(username, password, repeatPassword);
        res.redirect('/auth/login');

    } catch (error) {
        res.status(400).render('auth/register', { error: error.message })
    }
};

const getLoginPage = (req, res) => {
    res.render('auth/login');
};

const postLoginPage = (req, res) => {
    let { username, password } = req.body;

    authService.loginUser(username, password)
        .then(user => {
            let token = authService.createToken(user);
            return Promise.all([user, token]);
        })
        .then(([user, token]) => {
            if (!user) {
                res.redirect('/404');
            } else {
                res.cookie(TOKEN_COOKIE_NAME, token, {
                    httpOnly: true,
                });
                res.redirect('/');
            }
        })
        .catch(err => {
            res.status(400).redirect('404');
        })
};



router.get('/register', getRegisterPage);
router.post('/register', postRegisterPage);
router.get('/login', getLoginPage);
router.post('/login', postLoginPage);



module.exports = router;