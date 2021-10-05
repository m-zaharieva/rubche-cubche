// Node Modules
const express = require('express');
const path = require('path');

// Local modules
const handlebars = require('./config/handlebars.js');
const router = require('./routes.js');

// app
const app = express();
app.use(express.static(path.resolve(path.resolve(__dirname, 'static'))));
handlebars(app);
app.use(router);
app.listen(5000, () => console.log('App is running on http://localhost:5000 ...'));