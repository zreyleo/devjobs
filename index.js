require('dotenv').config();

const mongoose = require('mongoose');
require('./config/db');

const path = require('path');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express-validator
app.use(expressValidator());

app.engine('handlebars', exphbs({
    defaultLayout: 'layout',
    helpers: require('./helpers/handlebars')
}));

// establecer el template engine
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRETO,
    key:process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());

// middleware para los mensajes de la aplicacion
app.use((req, res, next) => {
    res.locals.mensajes = flash();
    next();
});

routes(app);

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto ' + process.env.PORT);
});