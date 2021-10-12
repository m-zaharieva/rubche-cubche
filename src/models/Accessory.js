const mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    imageUrl: {
        type: String, 
        required: true,
        validate: [/https?:\/\//i, 'Invalid image url! The adress should start with http protocol. '],
    },
    description: {
        type: String, 
        required: true, 
        maxlength: 500,
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;