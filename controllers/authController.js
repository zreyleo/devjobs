const passport = require('passport');
const Vacante = require('../models/Vacante');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.cerrarSesion = (req, res) => {
    req.logout();
    req.flash('correcto', 'Cerraste Sesión')
    return res.redirect('/iniciar-sesion');
}

// Revisar si el usuario esta autenticado
exports.verificarUsuario = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/iniciar-sesion');
}

exports.mostrarPanel = async (req, res) => {
    const vacantes = await Vacante.find({ autor: req.user._id }).lean();

    res.render('administracion', {
        titlePage: 'Panel de Administración',
        tagline: 'Crea y Administra tus vacantes desde aquí',
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        vacantes
    })
}