const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        validate: /[a-zA-Z0-9\_\-\.]+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});

// userSchema.method('saveHash', function () {
//     let hashedPassword = bcrypt.hash(this.password);
//     this.password = hashedPassword;
// });


const User = mongoose.model('User', userSchema);

module.exports = User;