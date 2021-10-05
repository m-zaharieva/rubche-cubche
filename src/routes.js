const express = require('express');
const homeController = require('./controllers/homeControllers.js');
const router = express.Router();


router.use(homeController);

module.exports = router;

