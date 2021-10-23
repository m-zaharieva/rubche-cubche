const router = require('express').Router();
const validator = require('validator');

const authService = require('./../services/authService.js');
const { TOKEN_COOKIE_NAME } = require('./../constants.js');



const getRegisterPage = (req, res) => {
    res.render('auth/register');
};

const postRegisterPage = async (req, res) => {
    try {
        let { username, password, repeatPassword } = req.body;

        if (password !== repeatPassword && password.length <= 8) {
            throw new Error('Passwords don\'t match!');
        }

        await authService.registerUser(username, password, repeatPassword);
        res.redirect('/auth/login');

    } catch (error) {
        let errors = Object.keys(error.errors).map(v => error.errors[v].message);
        res.status(400).render('auth/register', { error: errors })
    }
};

const getLoginPage = (req, res) => {
    res.render('auth/login');
};

const postLoginPage = (req, res) => {
    let { username, password } = req.body;

    if (!validator.isAlphanumeric(username) || !validator.isAlphanumeric(password)) {
        return res.status(400).render('auth/login', { error: ['Invalid username or password!'] });
    }
    
    authService.loginUser(username, password)
        .then(user => {
            if (!user) {
                throw new Error (`Your username or password don't match!`);
            }
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
        .catch(error => {
            res.status(400).render('auth/login', { error: [error.message] });
        });


};

const logout = (req, res) => {
    res.clearCookie(TOKEN_COOKIE_NAME);
    res.redirect('/');
}

router.get('/register', getRegisterPage);
router.post('/register', postRegisterPage);
router.get('/login', getLoginPage);
router.post('/login', postLoginPage);
router.get('/logout', logout);



module.exports = router;