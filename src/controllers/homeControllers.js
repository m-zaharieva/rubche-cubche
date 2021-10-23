//Modules
const router = require('express').Router();

const cubeService = require('./../services/cubeService.js');


// Actions
const home = (req, res) => {
    const cubes = cubeService.getAll()
        .then(cubes => {
            res.render('index', { cubes });
        })
        .catch(error => {
            res.status(400).render('index', { error: error.message });
        });
}

const about = (req, res) => {
    res.render('about');
}

const search = async (req, res) => {
    let { search, from, to } = req.query;

    try {
        let cubes = await cubeService.search(search, from, to);
        res.render('index', {
            title: 'RESULTS', 
            cubes,
        });
    } catch (error) {
        res.status(400).render('index', { error: error.message });
    }
    
}


// Routers
router.get('/', home);
router.get('/about', about);
router.get('/search', search);


module.exports = router;



