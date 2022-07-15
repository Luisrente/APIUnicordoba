const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Asistencia = require('../models/asistencia');
const asistencia = require('../models/asistencia');



const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}



const usuariosPas = async(req = request, res = response) => {
    const { id  } = req.params;
    const usuario = await Usuario.findOne({ codigo: id });

    if(usuario == null){
        return res.status(400).json({
            msg: 'Error 404'
        });

    }else{
        // asistencia =  new Asistencia({usuario})
        // const respAsit =  await  asistencia.create();
        // if( respAsit == null){
        //     return res.status(400).json({
        //         msg: 'Error 404'
        //     });
        // }else{
        //  res.json(
        //      usuario
        //  );
        // }

    }
}

const usuariosPost = async(req, res = response) => {
    console.log("fhfhfhfhf");
    const { nombre,apellido,correo,password,codigo,huella,img,rol,estado,index, documento}=req.body;
    const usuario = new Usuario({ index,nombre,apellido,correo,password,codigo,huella,img,rol,estado ,documento});
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    // usuario.password = bcryptjs.hashSync( password, salt );
    // Guardar en BD
    await usuario.save();
    console.log("ttttttt");

    res.json(
        usuario
    );
}


const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPuthuella = async(req, res = response) => {
    const { index } = req.params;
    console.log('index${index}');
       if ( index ) {
        try{
            console.log(index);
            const id = await Usuario.find({index:index}).select("id");
            const usuario = await Usuario.findByIdAndUpdate( id, {"huella":index});
            res.json(
                usuario
            ); 
        }catch (error) {
            console.log(error);
            console.log(error);
            console.log(error);
            return res.status(400).json({
                msg: 'Error '
            });
        }
    }else{
        res.json({
            msg: 'put Api required password',
            update:false
        });
    }
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    
    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPas,
    usuariosPuthuella
}