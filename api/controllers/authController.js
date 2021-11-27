const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    }catch (e){
        res.status(500).json(e);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json('Wrong Username');

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&  res.status(401).json('Wrong Password');

        const {password, ...info} = user._doc;

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: '2d'}
        )

        res.status(200).json({...info, accessToken})

    }catch (e){
        res.status(401).json(e);
    }
}
