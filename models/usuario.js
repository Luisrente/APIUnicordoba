
const { Schema, model } = require('mongoose');

// var autoIncrement = require("mongodb-autoincrement");
var autoIncrement = require("mongodb-autoincrement");


const UsuarioSchema = Schema({
    index: {type: String, 
        // required: true
    },
    nombre1: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    nombre2: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    apellido1: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    apellido2: {
        type: String,
        // required: [true, 'El nombre es obligatorio']
    },
    documento: {
        type: String,
        required: [true, 'La documento es obligatoria'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        // required: [true, 'La contraseña es obligatoria'],
    },
    codigo: {
        type: String,
        // required: [true, 'La contraseña es obligatoria'],
    },
    huella: {
        type: String,
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

// UsuarioSchema.plugin(autoIncrement.plugin, {
//     model: 'Subscribers',
//     field: '_id'
// });
UsuarioSchema.plugin(autoIncrement.mongoosePlugin,{
    model: 'Subscribers',
    field: 'index'
});


UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
