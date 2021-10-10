const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

const Cube = require('./../models/cube.js');

const getCreateCudePage = (req, res) => {
    res.render('create');
}

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
    let cube = getOne(id)
        .then((test)=> {
            console.log('test')
            console.log(test);
            res.render(`details`, {cube});
        });
}


router.get('/create', getCreateCudePage);
router.post('/create', createCube);
router.get('/details/:id', cubeDetails)




module.exports = router;



