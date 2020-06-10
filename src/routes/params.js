'use strict';

// const express =require('express')
// const router = express.Router({ mergeParams: true });

const {verificarParametroPais} = require('../middlewares/verificarParametroPais');
const {verificarParametroPaisSubdivision} = require('../middlewares/verificarParametroPaisSubdivision');
const {verificarParametroCiudad} = require('../middlewares/verificarParametroCiudad');
const {verificarParametroCodigoPostal} = require('../middlewares/verificarParametroCodigoPostal');
const {verificarParametroAsentamiento} = require('../middlewares/verificarParametroAsentamiento');

module.exports = router=>{
  router.param('Id_Pais',verificarParametroPais);

  router.param('Id_PaisSubdivision',verificarParametroPaisSubdivision);

  router.param('Id_Ciudad',verificarParametroCiudad);

  router.param('Id_CodigoPostal',verificarParametroCodigoPostal);

  router.param('Id_Asentamiento',verificarParametroAsentamiento);

  return router;
};
