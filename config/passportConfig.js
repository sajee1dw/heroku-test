const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Admin = mongoose.model('Admin');

passport.use(
    new localStrategy({usernameField:'username'},
        (username,password,done)=>{
            Admin.findOne({ username: username},
            (err,user)=>{
                if(err)
                    return done(err);
                //unknown user
                else if(!user)
                    return done(null, false, {message:'UserName is not registered'});
                //wrong password
                else if(user && !user.verifyPassword(password))
                    return done(null, false, {message:'Wrong Password'});
                //authentication succeeded
                else
                    return done(null,user, {message: 'User authenticated successfully.'});
            });
        })
);