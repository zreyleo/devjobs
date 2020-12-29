const Usuario = require('../models/Usuario');

exports.formCrearCuenta = (req, res, next) => {
    res.render('crear-cuenta', {
        titlePage: 'Crear Cuenta',
        tagline: 'Comienza a publicar tus vacante gratis, solo debes crear una cuenta.'
    })
}

exports.crearCuenta = async (req, res, next) => {
    const usuario = new Usuario(req.body);

    const nuevoUsuario = await usuario.save()
    
    if (!nuevoUsuario) return next();

    res.redirect('/')
}