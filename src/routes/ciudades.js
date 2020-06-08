'use strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const ciudades = require('../controllers/ciudades');

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades',checkToken,ciudades.getAll);

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad',checkToken,ciudades.getUnique);

module.exports = router;
