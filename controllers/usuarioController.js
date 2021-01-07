const Usuario = require('../models/Usuario');

exports.formCrearCuenta = (req, res, next) => {
    res.render('crear-cuenta', {
        titlePage: 'Crear Cuenta'
    })
}

exports.formIniciarSesion = (req, res, next) => {
    res.render('iniciar-sesion', {
        titlePage: 'Iniciar Sesión',
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
    req.checkBody('confirmar', 'El password no esta confirmado correctamente').equals(req.body.password);

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

exports.formEditarPerfil = (req, res) => {
    const { nombre, email } = req.user;
    res.render('editar-perfil', {
        titlePage: 'Editar Perfil',
        nombre,
        email,
        cerrarSesion: true,
    })
}

exports.editarPerfil = async (req, res) => {
    const usuario = await Usuario.findById(req.user._id);
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    if (req.body.password) {
        usuario.password = req.body.password;
    }
    await usuario.save();
    req.flash('correcto', 'Cambios guardados');
    res.redirect('/administracion');
}

exports.validarPerfil = (req, res, next) => {
    const { nombre, email } = req.user;

    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();

    if (req.body.password) {
        req.sanitizeBody('password').escape();
    }

    req.checkBody('nombre', 'Debes tener un nombre').notEmpty();
    req.checkBody('email', 'Debes tener un email').notEmpty();
    
    const errores = req.validationErrors();

    if (errores) {
        console.log('hola')
        req.flash('error', errores.map(error => error.msg));

        return res.render('editar-perfil', {
            titlePage: 'Editar Perfil',
            nombre,
            email,
            cerrarSesion: true,
            mensajes: req.flash()
        })
    }

    next();
}