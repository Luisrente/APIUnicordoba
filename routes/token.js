const { Router } = require('express');
const router = Router();

const {
    generartoken,
  } = require("../controllers/token");

 router.post("/",generartoken );



module.exports = router;
