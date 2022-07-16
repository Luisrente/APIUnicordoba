const { Schema, model } = require('mongoose');

const TokenSchema = Schema({
    codigo: {
        type: Number,
    },
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    documento: {
        type: String,
    },
    fecha: {
        type: Date
    }
});


TokenSchema.methods.toJSON = function() {
    const { __v, password, _id, ...token  } = this.toObject();
    token.uid = _id;
    return token;
}


module.exports = model( 'Token', TokenSchema );
