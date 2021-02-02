const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const passport = require("passport");
const bcrypt = require("bcryptjs");

module.exports.adminRegister = async function (req, res, next) {
  var admin = new Admin();
  const salt = await bcrypt.genSalt(10);
  admin.username = req.body.username;
  admin.password = await bcrypt.hash(req.body.password, salt);
  admin.email = req.body.email;
  admin.dateOfAssignment = req.body.dateOfAssignment;
  admin.role = req.body.role;

  admin.save(function (err, doc) {
    if (!err) {
      res.json({ success: true, token: admin.generateJwt() });
    } else {
      if (err.code == 11000) res.status(422).send(["Duplicate email found"]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  //call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    //error from passport middleware
    if (err) return res.status(400).json(err);
    else if (user)
      return res.status(200).json({ success: true, token: user.generateJwt() });
    //unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};
