require('../config/config.js');
var mongoose = require('mongoose');
require('./user.model.js');
require('./admin.model.js');

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB connection successful........');
    } else {
        console.log('Error in mongoDB connection' + JSON.stringify(err, undefined, 2));
    }
});