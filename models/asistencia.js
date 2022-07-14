
const { Schema, model } = require('mongoose');
var autoIncrement = require("mongodb-autoincrement");


const AsistenciaSchema = Schema({
    nombre: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    codigo: {
        type: String,
        // required: [true, 'La contraseña es obligatoria'],
    },
    documento: {
        type: String,
        required: [true, 'El documento es obligatorio']
    },
    dependencia: {
        type: String,
        required: [true, 'La dependencia es obligatorio']
    },
    sede: {
        type: String,
        required: [true, 'La sede es obligatorio']
    },
    estado: {
        type: String,
        default: "true"
    },
    horaInsert: {
        type: Date,
        default: Date
    }
});



AsistenciaSchema.methods.toJSON = function() {
    const { __v, ...Asist  } = this.toObject();
    return Asist;
}

module.exports = model( 'Asistencia', AsistenciaSchema );
