const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: String,
    expira: Date, 
    imagen: String
});

usuarioSchema.pre('save', async function (next) {
    // si el password ya viene hasheado
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

// envia alerta cuando un e-mail ya esta registrado
usuarioSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code == 11000) {
        next('El E-mail ya esta registrado');
    } else {
        next(error);
    }
});

// metodos del modelo Usuario
usuarioSchema.methods = {
    compararPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('Usuario', usuarioSchema);
