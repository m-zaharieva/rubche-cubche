// Node Modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Local modules
const handlebars = require('./config/handlebars.js');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV];
const initDatabase = require('./config/database.js');
const authMiddleware = require('./middlewares/authMiddleware.js');



// app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware.auth);
handlebars(app);

app.use(express.static(path.resolve(path.resolve(__dirname, 'static'))));
app.use(routes);



// Initialize Database and start the application
initDatabase(config.DB_CONNECTION)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT} ...`));
    })
    .catch(err => {
        console.log('Application init failed: ', err);
    });

