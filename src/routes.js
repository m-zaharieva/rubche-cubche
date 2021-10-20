const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeControllers.js');
const cubesController = require('./controllers/cubesController.js')
const accessoryController = require('./controllers/accessoryController.js');
const authController = require('./controllers/authController.js');


router.use(homeController);
router.use('/cube', cubesController);
router.use('/accessory', accessoryController);
router.use('/auth', authController);


const notFound = (req, res) => {
    res.status(404).render('404');
}
router.get('*', notFound);


module.exports = router;

