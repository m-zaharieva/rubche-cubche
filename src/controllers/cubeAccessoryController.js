const router = require('express').Router({mergeParams: true});

const accessoryService = require('../services/accessoryService.js');
const cubeService = require('../services/cubeService.js');



router.get('/add', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeService.getOne(id);
    const accessoryIds = cube.accessories.map(x => x._id);
    const accessories = await accessoryService.getAllUnattached(accessoryIds);
    
     res.render('cube/attachAccessory', {cube, accessories});

});

router.post('/add', (req, res) => {
    let accessoryId = req.body.accessory;
    let cubeId = req.params.id;

    cubeService.attachAccessory(cubeId, accessoryId).
        then((cube) => {
            console.log(cube);
            res.redirect(`/cube/${cubeId}`);
        });
});


module.exports = router;