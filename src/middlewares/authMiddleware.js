const { SECRET, TOKEN_COOKIE_NAME } = require('./../constants.js');
const { jwtVerify } = require('./../utils/jwtUtils.js');

const auth = (req, res, next) => {
    let token = req.cookies[TOKEN_COOKIE_NAME];

    if(!token) {
        return next();
    }

    jwtVerify(token, SECRET)
        .then(decodedToken => {
            if (decodedToken) {
                res.user = decodedToken;
                next();
            } else {
                return res.status(400).redirect('/auth/login');
            }
        })
        .catch(err => {
            return res.status(400).redirect('auth/login');
        });
}

const isAuth = (req, res, next) => {
    if(!req.user) {
        return res.status(400).redirect('login');
    }
    next();
}

let authMiddleware = {
    auth,
    isAuth,
}

module.exports = authMiddleware;