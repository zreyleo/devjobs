const mongoose = require('mongoose');

const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        titlePage: 'Nueva Vacante',
        tagline: 'Llena el formulario para publicar una vacante',
        cerrarSesion: true,
        nombre: req.user.nombre,
    })
};

exports.agregarVacante = (req, res) => {
    const vacante = new Vacante(req.body);

    vacante.autor = req.user._id;

    vacante.skills = req.body.skills.split(',');

    vacante.save((error, vacantesaved) => {
        if (error) {
            console.log(error);
        }

        res.redirect(`/vacantes/${vacantesaved.url}`);
    });
};

exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url });

    if (!vacante) return next();

    const { empresa, ubicacion, contrato, salario, descripcion, skills, url } = vacante;

    res.render('vacante', {
        titlePage: vacante.titulo,
        barra: true,
        empresa,
        ubicacion,
        contrato,
        salario,
        descripcion,
        skills,
        url
    });
}

exports.formEditarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url }).lean();

    if (!vacante) return next();

    res.render('editar-vacante', {
        titlePage: `Editar - ${vacante.titulo}`,
        vacante,
        cerrarSesion: true,
        nombre: req.user.nombre,
    })
}

exports.editarVacante = async (req, res, next) => {
    const vacanteActualizada = req.body;

    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({ url: req.params.url }, vacanteActualizada, { new: true, runValidators: true });

    res.redirect(`/vacantes/${vacante.url}`)
}

exports.validarVacante = (req, res, next) => {
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    req.checkBody('titulo', 'Agrega un titulo a la vacante').notEmpty();
    req.checkBody('empresa', 'Agrega una empresa a la vacante').notEmpty();
    req.checkBody('ubicacion', 'Agrega una ubicacion a la vacante').notEmpty();
    req.checkBody('salario', 'Agrega un salario a la vacante').notEmpty();
    req.checkBody('contrato', 'Selecciona un tipo de contrato').notEmpty();
    req.checkBody('skills', 'Agrega al menos una habilidad').notEmpty();

    const errores = req.validationErrors();

    if (errores) {
        req.flash('error', errores.map(error => error.msg));

        return res.render('nueva-vacante', {
            titlePage: 'Nueva Vacante',
            tagline: 'Llena el formulario para publicar una vacante',
            cerrarSesion: true,
            nombre: req.user.nombre,
        })
    }

    next();
}