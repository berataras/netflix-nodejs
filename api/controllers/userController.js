const User = require('../models/User');

exports.getAll = async (req, res) => {

}

exports.getUserStats = async (req, res) => {

}

exports.update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {new: true}); //yeni değeri döndür.
        res.status(200).json(updatedUser);
    }catch (e){
        res.status(500).json(e);
    }
}

exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json('user_deleted');
    }catch (e){
        res.status(500).json(e);
    }
}
