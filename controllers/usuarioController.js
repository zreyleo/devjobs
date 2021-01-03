const Usuario = require('../models/Usuario');

exports.formCrearCuenta = (req, res, next) => {
    res.render('crear-cuenta', {
        titlePage: 'Crear Cuenta',
        tagline: 'Comienza a publicar tus vacante gratis, solo debes crear una cuenta.'
    })
}

exports.validarRegistro = (req, res, next) => {
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    req.checkBody('nombre', 'El Nombre es obligatorio').notEmpty();
    req.checkBody('email', 'El Email debe ser valido').isEmail();
    req.checkBody('password', 'El password no debe ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password no esta confirmado correctamente.').equals(req.body.password);

    const errores = req.validationErrors();

    if (errores) {
        req.flash('error', errores.map(error => error.msg));
        res.render('crear-cuenta', {
            titlePage: 'Crear Cuenta',
            tagline: 'Comienza a publicar tus vacante gratis, solo debes crear una cuenta.',
            mensajes: req.flash()
        });
        return;
    }

    next();
}

exports.crearCuenta = async (req, res, next) => {
    const usuario = new Usuario(req.body);

    try {
        await usuario.save();
        res.redirect('/');
    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }
}

