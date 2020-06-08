'use strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const asentamientos = require('../controllers/asentamientos');

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales/:Id_CodigoPostal/asentamientos',checkToken, asentamientos.getAll);

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales/:Id_CodigoPostal/asentamientos/Id_Asentamiento',checkToken, asentamientos.getUnique);

module.exports = router;
