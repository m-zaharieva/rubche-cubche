const Cube = require("../models/cube.js");


const getAll = () => {
    return Cube.cubes;
}

const getOne = (id) => {
    return Cube.cubes.filter(x => x.id == id);
}

const search = (text, from, to) => {
    let result = getAll();

    if (text) {
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (from) {
        result = result.filter(x => x.difficulty >= from);
    }

    if (to) {
        result = result.filter(x => x.difficulty <= to);
    }

    return result;
}

let cubeService = {
    getAll,
    search,
    getOne,
}

module.exports = cubeService;