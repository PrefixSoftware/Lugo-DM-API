'use strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const codigosPostales = require('../controllers/codigosPostales');

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales', checkToken, codigosPostales.getAll);

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciuda/codigosPostales/Id_CodigoPostal', checkToken, codigosPostales.getUnique);

module.exports = router;
