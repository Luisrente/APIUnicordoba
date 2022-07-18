const { Schema, model } = require('mongoose');

const TokenSchema = Schema({
    codigo: {
        type: Number,
    },
    nombre1: {
        type: String,
    },
    apellido1: {
        type: String,
    },
    documento: {
        type: String,
    },
    fecha: {
        type: Date
    },
    tiempo: {
        type: String
    }
});


TokenSchema.methods.toJSON = function() {
    const { __v, password, _id, ...token  } = this.toObject();
    token.uid = _id;
    return token;
}


module.exports = model( 'Token', TokenSchema );
