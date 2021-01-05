const homeController = require('./controllers/homeController');
const vacanteController = require('./controllers/vacanteController');
const usuarioController = require('./controllers/usuarioController');
const authController = require('./controllers/authController');

module.exports = function (app) {
    app.get('/', homeController.mostrarTrabajos);

    // Vacantes
    app.get('/vacantes/nueva', vacanteController.formularioNuevaVacante);
    app.post('/vacantes/nueva', vacanteController.agregarVacante);
    app.get('/vacantes/:url', vacanteController.mostrarVacante);
    app.get('/vacantes/editar/:url', vacanteController.formEditarVacante);
    app.post('/vacantes/editar/:url', vacanteController.editarVacante);

    // Usuarios
    app.get('/crear-cuenta', usuarioController.formCrearCuenta);
    app.post('/crear-cuenta', usuarioController.validarRegistro, usuarioController.crearCuenta);
    app.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    app.post('/iniciar-sesion', authController.autenticarUsuario);
}