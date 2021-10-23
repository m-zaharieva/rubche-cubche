const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: [/^[a-zA-Z0-9 ]+$/, 'Cube name should have only English letters, digits and whitespaces'],
        required: true,
        minlength: [5, 'Cube name should have no less then 5 characters'],
    },
    description: {
        type: String, 
        required: true, 
        validate: [/^[a-zA-Z0-9 ]+$/, 'Cube description should have only English letters, digits and whitespaces'],
        minlength: [20, 'Cube description should have no less then 20 characters' ],
    },
    imageUrl: {
        type: String, 
        required: true,
        validate: [/^https?:\/\//i, 'Invalid image url! The adress should start with the http protocol. ']
    }, 
    difficulty: {
        type: Number, 
        required: true, 
        min: 1, 
        max: 6
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'Accessory',
        }
    ], 
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;
