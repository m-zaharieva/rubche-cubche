//Modules
const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

const Cube = require('./../models/cube.js');

// GET 'Create a Cube' Page
const getCreateCudePage = (req, res) => {
    res.render('create');
}

// POST Create a new cube
const createCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    cubeService.create(name, description, imageUrl, difficulty)
        .then((cube) => {
            console.log(cube);
            res.redirect('/');
            res.end();
        })
}


const cubeDetails = (req, res) => {
    let id = req.params.id;    
    cubeService.getOne(id)
        .then((cube)=> {
            console.log(cube);
            res.render(`details`, {cube});
        });
}


router.get('/create', getCreateCudePage);
router.post('/create', createCube);
router.get('/details/:id', cubeDetails)




module.exports = router;



