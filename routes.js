const homeController = require('./controllers/homeController');
const vacanteController = require('./controllers/vacanteController');
const usuarioController = require('./controllers/usuarioController');
const authController = require('./controllers/authController');

module.exports = function (app) {
    app.get('/', homeController.mostrarTrabajos);

    // Vacantes
    app.get('/vacantes/nueva', authController.verificarUsuario, vacanteController.formularioNuevaVacante);
    app.post('/vacantes/nueva', authController.verificarUsuario, vacanteController.agregarVacante);
    app.get('/vacantes/:url', vacanteController.mostrarVacante);
    app.get('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.formEditarVacante);
    app.post('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.editarVacante);

    // Usuarios
    app.get('/crear-cuenta', usuarioController.formCrearCuenta);
    app.post('/crear-cuenta', usuarioController.validarRegistro, usuarioController.crearCuenta);
    app.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    app.post('/iniciar-sesion', authController.autenticarUsuario);

    // Administracion
    app.get('/administracion', authController.verificarUsuario, authController.mostrarPanel)
}