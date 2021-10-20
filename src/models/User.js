const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minlength: [4, 'Username cannot have less then 4 characters!'],
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consist of english letters and digits!'],
        unique: true,
    },
    password: {
        type: String,
        validate: [/^[a-zA-Z0-9]+$/, 'Password should consist of english letters and digits'],
        required: true,
        minlength: 6,
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})


const User = mongoose.model('User', userSchema);

module.exports = User;