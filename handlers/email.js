const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const util = require('util');

const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: 'handlebars',
        partialsDir: process.cwd() + '/views/emails',
        layoutsDir: __dirname + '/../views/emails',
        defaultLayout: 'reset.handlebars'
    },
    viewPath: __dirname + '/../views/emails',
    extName: '.handlebars'
}))

exports.enviar = async (opciones) => {
    const opcionesEmail = {
        from: 'devjobs <noreply@devjobs.com>',
        to: opciones.usuario.email,
        subject: opciones.subject,
        template: opciones.archivo,
        context: {
            resetUrl: opciones.resetUrl
        }
    }

    const sendMail = util.promisify(transport.sendMail, transport)
    return sendMail.call(transport, opcionesEmail)
}
