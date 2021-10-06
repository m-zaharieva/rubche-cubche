const Cube = require("../models/cube.js");


const getAll = () => {
    return Cube.cubes;
}

let cubeService = {
    getAll,
}

module.exports = cubeService;