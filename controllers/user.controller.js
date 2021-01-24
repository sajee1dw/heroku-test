const mongoose = require('mongoose');
const User = mongoose.model('User');;

module.exports.register = async function(req, res, next) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    console.log(user);


    user.save(function(err, doc) {
        if (!err) {
            res.json({ success: true });
        } else {
            return next(err);
        }

    });
};