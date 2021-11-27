const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const UserSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    image: {type: String, default: 'default.png'},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true});

UserSchema.pre('save',function (next){
    this.password = CryptoJS.AES.encrypt(this.password, process.env.SECRET_KEY).toString()
    next();
})

UserSchema.pre('findOneAndUpdate',function (next){
    this._update.password = CryptoJS.AES.encrypt(this.password, process.env.SECRET_KEY).toString()
    next();
})


module.exports = mongoose.model('User', UserSchema);
