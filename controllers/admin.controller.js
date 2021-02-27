const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const emailController = require('./email.controller');

//Register Admin
module.exports.adminRegister = async function (req, res, next) {
  var admin = new Admin();
  const salt = await bcrypt.genSalt(10);
  admin.username = req.body.username;
  admin.password = await bcrypt.hash(req.body.password, salt);
  admin.email = req.body.email;
  admin.dateOfAssignment = Date.now();
  admin.role = req.body.role;

  admin.save(async function (err, doc) {
    if (!err) {
      res.json({ success: true, token: admin.generateJwt() });
      await sendAdminRegisterEmail(admin.email);
    } else {
      if (err.code == 11000) res.status(422).send(["Duplicate email found"]);
      else return next(err);
    }
  });
};

function sendAdminRegisterEmail(receiverEmail) {
  return new Promise(async function (resolve, reject) {
    try {
      if (!receiverEmail) {
        reject("Email Null.");
      } else {
        const userEmail = receiverEmail;
        const htmlBody =
          "<h1> Welcome, </h1><p> Successfully registered as an Admin in Sigen.lk.. Please contact super admins for the credentials</p>";
        emailController.sendemail(userEmail, htmlBody);
        resolve("Sent Admin Register Email Successfully.");
      }
    } catch (e) {
      reject("Error getting user email : " + e);
    }
  });
}
//Login Admin
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
// Remove admin
module.exports.removeAdmin = function (req, res, next) {
  const email = req.body.email;

  Admin.deleteOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ success: true });
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};
// Edit profile
module.exports.editProfile = function (req, res, next) {
  const userId = req.body._id;

  Admin.updateOne(
    { _id: userId },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    }
  )
    .then((result) => {
      if (result) {
        res.send({ success: true });
      }
    })
    .catch((error) => {
      res.json({ error: error });
      console.log(error);
    });
};

//Change Password
module.exports.resetPassword = function (userId, newPassword) {
  bcrypt.hash(newPassword, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(hash);
      Admin.updateOne({ _id: userId }, { $set: { password: hash } }).then(
        (result) => {
          console.log(result);
        }
      );
    }
  });
};
