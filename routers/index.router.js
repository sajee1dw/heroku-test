const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

const ctrlUser = require('../controllers/user.controller.js');



//user routes
router.post('/register', ctrlUser.register);



module.exports = router;