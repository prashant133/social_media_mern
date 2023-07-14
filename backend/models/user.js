const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true }, //uniqu
    password: { type: String, required: true },  // minlength:4
    id: { type: Number }
}, {
    timestamps: true
});

const User = mongoose.model('users', userSchema);
module.exports = User;