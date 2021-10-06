//Modules
const express = require('express');
const router = express.Router();

const cubeService = require('./../services/cubeService.js');


// Actions
const home = (req, res) => {
    let cubes = cubeService.getAll();
    res.render('index', { cubes });
}

const about = (req, res) => {
    res.render('about');
}


// Routers
router.get('/', home);
router.get('/about', about);


module.exports = router;



