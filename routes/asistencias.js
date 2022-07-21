const { Router } = require('express');
const router = Router();

const {
    getsAsistenciaMes,
  } = require("../controllers/asistencias");

 router.post("/", getsAsistenciaMes);



module.exports = router;
