//Modules
const router = require('express').Router();

const Cube = require('./../models/cube.js');
const cubeService = require('../services/cubeService.js');
const accessoryService = require('../services/accessoryService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');


// Actions

// GET 'Create a Cube' Page
const getCreateCudePage = (req, res) => {
    res.render('create');
}

// POST Create a new cube
const createCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    cubeService.create(name, description, imageUrl, difficulty)
        .then((cube) => {
            res.redirect('/');
            res.end();
        });
}

// GET Cube Details 
const cubeDetails = async (req, res) => {
    let id = req.params.id;
    let cube = await cubeService.getOne(id);
    console.log(cube);
    res.render(`details`, { ...cube });
        
}


router.get('/create', getCreateCudePage);
router.post('/create', createCube);
router.get('/:id', cubeDetails);

router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;



