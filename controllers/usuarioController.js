exports.crearCuenta = (req, res, next) => {
    res.render('crear-cuenta', {
        titlePage: 'Crear Cuenta',
        tagline: 'Comienza a publicar tus vacante gratis, solo debes crear una cuenta.'
    })
}