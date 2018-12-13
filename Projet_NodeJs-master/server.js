const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const plugin = require('./routers/api/plugin');
const user = require('./routers/api/user');
const auth = require('./routers/api/auth');
const url = 'mongodb://chendatao:bonjour1941@ds039301.mlab.com:39301/plugin_store';
// const url = 'mongodb://localhost:27017/plugin_store';

app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(express.static('storage'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
});

mongoose
    .connect(url)
    .then(() => console.log('connected'))
    .catch(err => console.log(err));

app.use('/api/plugin',plugin);
app.use('/api/user',user);
app.use('/api/auth',auth);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server started at '+port));