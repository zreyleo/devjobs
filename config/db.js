require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', error => {
    console.log(error);
});

require('../models/Vacante');