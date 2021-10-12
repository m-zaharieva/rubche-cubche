//Modules
const router = require('express').Router();

const cubeService = require('./../services/cubeService.js');


// Actions
const home = (req, res) => {
    const cubes = cubeService.getAll()
        .then(cubes => {
            res.render('index', { cubes });
        });
}

const about = (req, res) => {
    res.render('about');
}

const search = async (req, res) => {
    let { search, from, to } = req.query;
    let cubes = await cubeService.search(search, from, to);
    res.render('index', {
        title: 'RESULTS', 
        cubes
    })
}


// Routers
router.get('/', home);
router.get('/about', about);
router.get('/search', search);


module.exports = router;



