const mongoose = require('mongoose');

let accessorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: [5, 'Accessory name should have no less then 5 characters'],
        validate: [/^[a-zA-Z0-9 ]+$/, 'Accessory name should have only English letters, digits and whitespaces.'],
    }, 
    imageUrl: {
        type: String, 
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image url! The adress should start with http protocol. '],
    },
    description: {
        type: String, 
        required: true, 
        validate: [/^[a-zA-Z0-9 ]+$/, 'Accessory name should have only English letters, digits and whitespaces'],
        minlength: [20, 'Accessory description should have no less then 20 characters' ],
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;