const homeController = require('./controllers/homeController')
const vacanteController = require('./controllers/vacanteController')

module.exports = function (app) {
    app.get('/', homeController.mostrarTrabajos);
    app.get('/vacantes/nueva', vacanteController.formularioNuevaVacante)
}