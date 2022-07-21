const { response } = require('express');

const Token = require('../models/token');



const generartoken = async(req, res = response) => {
    console.log("-----------------------------------");
    const { nombre1, documento, apellido1, fecha, codigo, tiempo} = req.body;
    try {
        const token = new Token({ nombre1,documento, apellido1, fecha,codigo , tiempo});
       const tokenn= await token.save();
        // if ( !usuario ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - correo'
        //     });
        // }

        // SI el usuario está activo
        // if ( !usuario.estado ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - estado: false'
        //     });
        // }

        // Verificar la contraseña
        // const validPassword = bcryptjs.compareSync( password, usuario.password );
        // if ( !validPassword ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - password'
        //     });
        // }

        // if ( usuario.password!=password ) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - password'
        //     });
        // }
        // Generar el JWT
        // const token = await generarJWT( usuario.id );
        console.log(tokenn);
        res.json(
            tokenn
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}



module.exports = {
    generartoken
}
