// Node Modules
const express = require('express');

// Local modules
const handlebars = require('./config/handlebars.js');
const router = require('./router.js');

// app
const app = express();
handlebars(app);
app.use(router);
app.listen(5000, () => console.log('App is running on http://localhost:5000 ...'));