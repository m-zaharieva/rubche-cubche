const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeControllers.js');
const cubesController = require('./controllers/cubesController.js')


router.use(homeController);
router.use('/cubes', cubesController);


const notFound = (req, res) => {
    res.render('404');
}
router.get('*', notFound);


module.exports = router;

