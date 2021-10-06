const express = require('express');
const cubeService = require('../services/cubeService.js');
const router = express.Router();

const Cube = require('./../models/cube.js');

const getCreateCudePage = (req, res) => {
    res.render('create');
}

const createCube = (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;
    let cube = new Cube(name, description, imageUrl, difficulty);
    Cube.add(cube);
    res.redirect('/');
    res.end();
}

const cubeDetails = (req, res) => {
    let id = req.params.id;
    let cube = cubeService.getAll().find(x => x.id == id);
    console.log(cube);
    res.render(`details`, {cube});

}


router.get('/create', getCreateCudePage);
router.post('/create', createCube);
router.get('/details/:id', cubeDetails)




module.exports = router;



