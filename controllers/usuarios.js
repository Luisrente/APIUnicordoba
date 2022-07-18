const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const Token = require("../models/token");
const Asistencia = require('../models/asistencia');

const usuariosGet = async (req = request, res = response) => {
  // const { limite = 5, desde = 0 } = req.query;
  // const query = { estado: true };

  // const [total, usuarios] = await Promise.all([
  //   Usuario.countDocuments(query),
  //   Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  // ]);

  // res.json({
  //   total,
  //   usuarios,
  // });
    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { documento } = req.params;
    const body = req.query;        
    // const usuario = await Usuario.findById( id );
    const usuario = await Usuario.findOne({ documento });
    if ( !usuario ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
    }
    res.json(
        usuario
    );
};

const usuariosPas = async (req = request, res = response) => {
  const { id } = req.params;
  try {
   const usuario = await Usuario.findOne({ codigo: id });
    if(usuario == null){
      const tokenres = await Token.findOne({ codigo: id });
      if(tokenres==null){
        return res.status(400).json({
          msg: 'Error 404'
      }); 
      }else{
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        console.log(timeElapsed);
        console.log(`${today}`);
        console.log(`${tokenres.fecha}`);
        console.log(today);
        console.log(tokenres.fecha);

        if(today<=tokenres.fecha){
          asistencia =  new Asistencia({nombre:tokenres.nombre,apellido: tokenres.apellido, documento:tokenres.documento , codigo:tokenres.codigo })
          const respAsit =  await  asistencia.save();
          if( respAsit == null){
              return res.status(400).json({
                  msg: 'Error 404'
              });
          }else{
           res.json(
            asistencia 
           );
          }
        }else{
          return res.status(400).json({
            msg: 'Verificar Token Fecha '
        });
        }
      }
    }else{
        asistencia =  new Asistencia({usuario,nombre:usuario.nombre})
        const respAsit =  await  asistencia.save();
        if( respAsit == null){
            return res.status(400).json({
                msg: 'Error 404'
            });
        }else{
         res.json(
             usuario
         );
        }
  } 

}catch (error) {
    console.log(`--------------->${error}`);
    return res.status(400).json({
      msg: "Error try ",
    });
  }

}



const usuariosPuthuella = async (req, res = response) => {
  const { index } = req.params;
  try {
    const id = await Usuario.findOne({ index });
    if (!id) {
      return res.status(401).json({
        msg: "user not found",
      });
    }
    const usuario = await Usuario.findByIdAndUpdate(id, { huella: index });
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Error ",
    });
  }
};

const getUserByHuella = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({ huella: id });
    if (!usuario) {
      return res.status(401).json({
        msg: "User not found",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error ",
    });
  }
};

const usuariosPost = async (req, res = response) => {
  console.log("fhfhfh-------------------fhf");


  try {
    const {
      index,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      documento,
      correo,
      password,
      huella,
      img,
      rol,
      estado
    } = req.body;
    let codigow= Math.random() * (5000 - 1000) + 1000;
    codigo=Math.trunc(codigow);    // 42
    const usuario = new Usuario({
      index,
      nombre1,
      nombre2,
      apellido1,
      apellido2,
      documento,
      correo,
      password,
      codigo,
      huella,
      img,
      rol,
      estado
    });
  
    await usuario.save();
    console.log("ttttttt");
  
     res.json(usuario);
    
  } catch (error) {
    res.status(400).json({
      
    });

  }
 


};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { password ,estado=true} = req.body;
  if ( password ) {
      // Encriptar la contraseña
      //  const salt = bcryptjs.genSaltSync();
      //  password = bcryptjs.hashSync( password, salt );
      try {
          const usuario = await Usuario.findByIdAndUpdate( id, {"estado":true,"password":password}, );
          // const usuario = await Usuario.findOne({ id });
          res.json({
              usuario,
              "token": "rrr"
          }); 
      } catch (error) {
          res.json({
              msg: 'put API - Error',
              update:false
          });  
      }
  }else{
      res.json({
          msg: 'put Api required password',
          update:false
      });
  }
};

// const usuariosPut = async (req, res = response) => {
//   const { id } = req.params;
//   const { _id, password, google, correo, ...resto } = req.body;

//   if (password) {
//     // Encriptar la contraseña
//     const salt = bcryptjs.genSaltSync();
//     resto.password = bcryptjs.hashSync(password, salt);
//   }

//   const usuario = await Usuario.findByIdAndUpdate(id, resto);

//   res.json(usuario);
// };

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPas,
  usuariosPuthuella,
  getUserByHuella,
};
