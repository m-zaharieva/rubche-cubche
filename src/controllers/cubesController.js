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
    let user = req.user;
    console.log(user);
    let { name, description, imageUrl, difficulty} = req.body;

    cubeService.create(name, description, imageUrl, difficulty, user._id )
        .then((cube) => {
            console.log(cube);
            res.redirect('/');
            res.end();
        });
}

// GET Cube Details 
const cubeDetails = async (req, res) => {
    let id = req.params.id;
    let cube = await cubeService.getOne(id);
    res.render(`cube/details`, { ...cube });

}

const getCubeEditPage = async (req, res) => {
    let id = req.params.id;
    let cube = await cubeService.getOne(id);
    res.render('cube/edit', { ...cube });
}

const postCubeEditPage = (req, res) => {
    let {name, description, imageUrl, difficulty} = req.body;
    let id = req.params.id;
    console.log(id);

    cubeService.edit(id, name, description, imageUrl, difficulty)
        .then(cube => {
            if (!cube) {
                return res.status(400).redirect('404');
            }

            cube.save();
            res.redirect(`/cube/${id}`);
        })
        .catch(err => {
            console.log(err);
        })

};

const getDeleteCubePage = async (req, res) => {
    let id = req.params.id;
    let cube = await cubeService.getOne(id);
    res.render(`cube/delete`, {...cube});
};

const postDeleteCubePage = async (req, res) => {
    let id = req.params.id;
    await cubeService.deleteCube(id);

    res.redirect('/');
};


router.get('/create', getCreateCudePage);
router.post('/create', createCube);
router.get('/:id', cubeDetails);
router.get('/:id/edit', getCubeEditPage);
router.post('/:id/edit', postCubeEditPage);
router.get('/:id/delete', getDeleteCubePage);
router.post('/:id/delete', postDeleteCubePage);


router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;



