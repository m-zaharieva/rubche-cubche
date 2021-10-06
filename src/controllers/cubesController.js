const express = require('express');
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


router.get('/create', getCreateCudePage);
router.post('/create', createCube);




module.exports = router;



