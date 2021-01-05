const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');

const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async (email, password, done) => {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        const verificarPass = usuario.compararPassword(password);
        if (!verificarPass) {
            return done(null, false, { message: 'Password incorrecto' });
        }

        return done(null, usuario);
    }
));

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.findById(id);
    return done(null, usuario);
});

module.exports = passport;