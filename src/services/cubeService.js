const Cube = require("../models/Cube.js");
const Accessory = require('./../models/Accessory.js');


const getAll = () => Cube.find().lean();

const getOne = (id) => Cube.findById(id).populate('accessories').lean();

const create = (name, description, imageUrl, difficulty, creatorId) => {
     const cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
        creatorId,
    });
    
    return cube.save();
}

const edit = (id, name, description, imageUrl, difficulty) => {
    return Cube.findOneAndUpdate({_id: id}, {name, description, imageUrl, difficulty});
}

const deleteCube = (id) => {
    return Cube.findByIdAndDelete(id);
}

const attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    return cube.save();
}

const search = async (text, from, to) => {
    let result = await getAll();

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
    edit,
    deleteCube,
}

module.exports = cubeService;