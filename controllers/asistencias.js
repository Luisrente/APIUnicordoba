const { response } = require('express');

const Asistencia = require('../models/asistencia');



const getsAsistenciaMes = async(req, res = response) => {
    console.log('paso por aqui');
    const inicio = new Date(req.body.inicio);
    const fin = new Date(req.body.fin);
    const documento = req.body.documento;
    try {
        const asistencia= await Asistencia.find({
            $and: [
                {
                    $and: [
                        {horaInsert: {$gte: inicio}},
                        {horaInsert: {$lte: fin}},
                    ]
                  },
                // {
                //     $and: [{documento: documento}]
                //   }
              ]  
        }

        );
        res.json({
            asistencia
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error asistencia '
        });
    } 

}



module.exports = {
    getsAsistenciaMes
}
