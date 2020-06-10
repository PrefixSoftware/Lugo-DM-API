'use strict';

const {checkToken} = require('../middlewares/Auth');

const ciudades = require('../controllers/ciudades');

module.exports = router => {

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades',checkToken,ciudades.getAll);

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad',checkToken,ciudades.getUnique);

  return router;
};
