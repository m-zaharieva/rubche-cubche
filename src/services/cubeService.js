const Cube = require("../models/cube.js");
const Accessory = require('./../models/Accessory.js');




const getAll = () => Cube.find().lean();

const getOne = (id) => Cube.findById(id).populate('accessories').lean();

const create = (name, description, imageUrl, difficulty) => {
     const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
    });
    
    return cube.save();
}

const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
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
    getOne,
    create,
    attachAccessory,
    search,
}

module.exports = cubeService;