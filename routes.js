const homeController = require('./controllers/homeController');
const vacanteController = require('./controllers/vacanteController');
const usuarioController = require('./controllers/usuarioController');
const authController = require('./controllers/authController');

module.exports = function (app) {
    app.get('/', homeController.mostrarTrabajos);

    // Vacantes
    app.get('/vacantes/nueva', authController.verificarUsuario, vacanteController.formularioNuevaVacante);
    app.post('/vacantes/nueva', authController.verificarUsuario, vacanteController.validarVacante, vacanteController.agregarVacante);
    app.get('/vacantes/:url', vacanteController.mostrarVacante);
    app.get('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.formEditarVacante);
    app.post('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.validarVacante, vacanteController.editarVacante);

    // Usuarios
    app.get('/crear-cuenta', usuarioController.formCrearCuenta);
    app.post('/crear-cuenta', usuarioController.validarRegistro, usuarioController.crearCuenta);
    app.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    app.post('/iniciar-sesion', authController.autenticarUsuario);
    app.get('/cerrar-sesion', authController.verificarUsuario, authController.cerrarSesion)

    // Administracion
    app.get('/administracion', authController.verificarUsuario, authController.mostrarPanel);

    app.get('/editar-perfil', authController.verificarUsuario, usuarioController.formEditarPerfil)
    app.post('/editar-perfil', authController.verificarUsuario, usuarioController.validarPerfil, usuarioController.editarPerfil)
}