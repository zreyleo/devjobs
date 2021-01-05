const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        titlePage: 'Panel de Administración',
        tagline: 'Crea y Administra tus vacantes desde aquí'
    })
}