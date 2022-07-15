const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPas = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({ codigo: id });
    if (usuario == null) {
      return res.status(401).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "Error ",
    });
  }
};

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
  console.log("fhfhfhfhf");
  const {
    nombre,
    apellido,
    correo,
    password,
    codigo,
    huella,
    img,
    rol,
    estado,
    index,
    documento,
  } = req.body;
  const usuario = new Usuario({
    index,
    nombre,
    apellido,
    correo,
    password,
    codigo,
    huella,
    img,
    rol,
    estado,
    documento,
  });
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  // usuario.password = bcryptjs.hashSync( password, salt );
  // Guardar en BD
  await usuario.save();
  console.log("ttttttt");

  res.json(usuario);
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

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
