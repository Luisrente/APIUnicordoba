const { Router } = require('express');
const router = Router();

const {
    generartoken,
    usuariosToken
  } = require("../controllers/token");

router.post("/",generartoken );
router.post("/personal/",usuariosToken );
 



module.exports = router;
