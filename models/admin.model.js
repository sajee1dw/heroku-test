const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long!']
    },
    dateOfAssignment: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
});



adminSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail');

// methods

adminSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
const JWT_SECRET = "SECRET#123";
const JWT_EXP = "2m";
adminSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id, role: this.role, username: this.username, email: this.email },
        JWT_SECRET, {
            expiresIn: JWT_EXP
        });
}

mongoose.model('Admin', adminSchema);
module.exports = adminSchema;