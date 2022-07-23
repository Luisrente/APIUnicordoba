const { Router } = require('express');
const router = Router();

const {
    generartoken,
    usuariosToken
  } = require("../controllers/token");

 router.post("/",generartoken );
  router.post("/personal/:id",usuariosToken );



module.exports = router;
