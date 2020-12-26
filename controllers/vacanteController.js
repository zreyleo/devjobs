exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        titlePage: 'Nueva Vacante',
        tagline: 'Llena el formulario para publicar una vacante'
    })
}