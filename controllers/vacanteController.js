const mongoose = require('mongoose');

const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        titlePage: 'Nueva Vacante',
        tagline: 'Llena el formulario para publicar una vacante'
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
        vacante
    })
}

exports.editarVacante = async (req, res, next) => {
    const vacanteActualizada = req.body;

    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({ url: req.params.url }, vacanteActualizada, { new: true, runValidators: true });

    res.redirect(`/vacantes/${vacante.url}`)
}