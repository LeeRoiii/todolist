//User.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
