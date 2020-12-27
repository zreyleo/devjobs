require('dotenv').config();

const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');

const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'layout',
    helpers: require('./helpers/handlebars')
}));

// establecer el template engine
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRETO,
    key:process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


routes(app);

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ' + process.env.PORT);
});