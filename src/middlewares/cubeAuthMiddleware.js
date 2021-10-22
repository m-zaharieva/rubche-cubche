const cubeService = require('./../services/cubeService.js');

exports.isCubeOwner = async (req, res, next) => {
    let user = req.user;
    let cubeId = req.params.id;
    let cube = await cubeService.getOne(cubeId);
    
    if(cube.creatorId == user._id) {
        req.cube = cube;
        next();
    } else {
        res.status(401).redirect('/404');
    }


}
