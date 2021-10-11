const Accessory = require('./../models/Accessory.js');


const getAll = () => {
    return Accessory.find({}).lean();
}

const getOne = (id) => {
    return Accessory.findById(id).lean();
}

const getAllUnattached = (accessoryIds) => {
    return Accessory.find({_id: {$nin: accessoryIds}}).lean();
}

const create = (name, description, imageUrl) => {
    let accessory = new Accessory({
        name,
        description,
        imageUrl
    });
    return accessory.save();
}


const accessoryService = {
    getAll,
    getOne,
    getAllUnattached,
    create, 
}

module.exports = accessoryService;