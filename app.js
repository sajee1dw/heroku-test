const express = require('express');
require('./models/db.js');

const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routers/index.router.js');
const app = express();

//middleware
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);


app.listen(process.env.PORT, function() { console.log('Server started at port:' + process.env.PORT) });