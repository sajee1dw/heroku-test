const express = require('express');

const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const bcrypt = require('bcryptjs');

const ctrlUser = require('../controllers/user.controller.js');
const ctrlAdmin = require('../controllers/admin.controller.js');


//user routes
router.post('/register', ctrlUser.register);
router.post('/adminRegister', ctrlAdmin.adminRegister);
router.post('/authenticate',ctrlAdmin.authenticate);


module.exports = router;