const homeController = require('./controllers/homeController')
const vacanteController = require('./controllers/vacanteController')

module.exports = function (app) {
    app.get('/', homeController.mostrarTrabajos);

    // Vacantes
    app.get('/vacantes/nueva', vacanteController.formularioNuevaVacante);
    app.post('/vacantes/nueva', vacanteController.agregarVacante);
}