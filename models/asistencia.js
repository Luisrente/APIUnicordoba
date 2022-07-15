
const { Schema, model } = require('mongoose');
const usuario = require('./usuario');

const AsistenciaSchema = Schema({
    usuario: {
        type: usuario,
    },
    horaInsert: {
        type: Date,
        default: Date.now
    }
});

AsistenciaSchema.methods.toJSON = function() {
    const { __v, ...Asist  } = this.toObject();
    return Asist;
}

module.exports = model( 'Asistencia', AsistenciaSchema );
