// Node Modules
const express = require('express');
const path = require('path');

// Local modules
const handlebars = require('./config/handlebars.js');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDb = require('./config/database.js');

// app
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(path.resolve(__dirname, 'static'))));
handlebars(app);
app.use(routes);
initDb();




app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT} ...` ));