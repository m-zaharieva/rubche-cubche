//Modules
const router = require('express').Router();

const Cube = require('./../models/cube.js');
const cubeService = require('../services/cubeService.js');
const cubeAccessoryController = require('./cubeAccessoryController.js');
const { isAuth } = require('./../middlewares/authMiddleware.js');
const { isCubeOwner } = require('./../middlewares/cubeAuthMiddleware.js');


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
    let isOwn = req.user && cube.creatorId == req.user._id;
    res.render(`cube/details`, { ...cube, isOwn});

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


router.get('/create', isAuth, getCreateCudePage);
router.post('/create', isAuth, createCube);
router.get('/:id', cubeDetails);
router.get('/:id/edit', isAuth, isCubeOwner, getCubeEditPage);
router.post('/:id/edit', isAuth, isCubeOwner, postCubeEditPage);
router.get('/:id/delete', isAuth, isCubeOwner, getDeleteCubePage);
router.post('/:id/delete', isAuth, isCubeOwner, postDeleteCubePage);


router.use('/:id/accessory', cubeAccessoryController);

module.exports = router;



