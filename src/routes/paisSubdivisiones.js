'useee strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const paisSubdivisiones = require('../controllers/paisSubdivisiones');

router.get('/paises/:Id_Pais/subdivisiones',checkToken, paisSubdivisiones.getAll);

router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision',checkToken, paisSubdivisiones.getUnique);

module.exports = router;
