const passport = require('passport');
const crypto = require('crypto');

const Usuario = require('../models/Usuario');
const Vacante = require('../models/Vacante');

const enviarEmail = require('../handlers/email')

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

exports.formRestablecerPassword = (req, res) => {
    res.render('restablecer-password', {
        titlePage: 'Restablece tu Password',
        tagline: 'Si ya tienes una cuenta y olvidaste tu password, lo puedes restablecer'
    });
}

exports.enviarToken = async (req, res) => {
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
        req.flash('error', 'No existe ese Usuario');
        return res.redirect('/crear-cuenta');
    }

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expira = Date.now() + 3600000;

    await usuario.save();
    const resetUrl = `${req.headers.host}/restablecer-password/${usuario.token}`;

    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reset'
    });

    req.flash('correcto', 'Revise su correo para las instrucciones');
    res.redirect('/iniciar-sesion')
}

exports.restablecerPassword = async (req, res) => {
    const usuario = await Usuario.findOne({ token: req.params.token, expira: { $gt: Date.now() } });

    if (!usuario) {
        req.flash('error', 'El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/restablecer-password');
    }

    res.render('nuevo-password', {
        titlePage: 'Nuevo Password',

    });
}

exports.guardarPassword = async (req, res) => {
    const usuario = await Usuario.findOne({ token: req.params.token, expira: { $gt: Date.now() } });

    if (!usuario) {
        req.flash('error', 'El formulario ya no es valido, intenta de nuevo');
        return res.redirect('/restablecer-password');
    }

    usuario.password = req.body.password;
    usuario.token = undefined
    usuario.expira = undefined

    await usuario.save();

    req.flash('correcto', 'Cambio de calve exitoso');
    res.redirect('/iniciar-sesion')
}