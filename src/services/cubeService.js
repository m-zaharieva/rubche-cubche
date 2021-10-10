const Cube = require("../models/cube.js");


const getAll = () => {
    return Cube.find().lean();
}

const getOne = (id) => {
    return Cube.findOne(id);
}

const create = (name, description, imageUrl, difficulty) => {
     const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
    });
    
    return cube.save();
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
    create,
}

module.exports = cubeService;