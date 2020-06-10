'use strict';

const {checkToken} = require('../middlewares/Auth');

const codigosPostales = require('../controllers/codigosPostales');

module.exports = router => {

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales', checkToken, codigosPostales.getAll);

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales/:Id_CodigoPostal', checkToken, codigosPostales.getUnique);

  return router;
};
