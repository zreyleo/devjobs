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
    app.post('/vacantes/:url', vacanteController.subirCV, vacanteController.contactar);
    app.get('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.formEditarVacante);
    app.post('/vacantes/editar/:url', authController.verificarUsuario, vacanteController.validarVacante, vacanteController.editarVacante);
    app.delete('/vacantes/eliminar/:id', vacanteController.eliminarVacante);

    // candidatos
    app.get('/candidatos/:id', authController.verificarUsuario, vacanteController.mostrarCandidatos)

    // Usuarios
    app.get('/crear-cuenta', usuarioController.formCrearCuenta);
    app.post('/crear-cuenta', usuarioController.validarRegistro, usuarioController.crearCuenta);
    app.get('/iniciar-sesion', usuarioController.formIniciarSesion);
    app.post('/iniciar-sesion', authController.autenticarUsuario);
    app.get('/cerrar-sesion', authController.verificarUsuario, authController.cerrarSesion);
    app.get('/restablecer-password', authController.formRestablecerPassword);
    app.post('/restablecer-password', authController.enviarToken);
    app.get('/restablecer-password/:token', authController.restablecerPassword);
    app.post('/restablecer-password/:token', authController.guardarPassword);


    // Administracion
    app.get('/administracion', authController.verificarUsuario, authController.mostrarPanel);

    app.get('/editar-perfil', authController.verificarUsuario, usuarioController.formEditarPerfil);
    app.post(
        '/editar-perfil', 
        authController.verificarUsuario,
        // usuarioController.validarPerfil,
        usuarioController.subirImagen,
        usuarioController.editarPerfil
    );

    
}