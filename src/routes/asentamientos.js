'use strict';

const {checkToken} = require('../middlewares/Auth');

const asentamientos = require('../controllers/asentamientos');

module.exports = router=>{

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales/:Id_CodigoPostal/asentamientos',checkToken, asentamientos.getAll);

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision/ciudades/:Id_Ciudad/codigosPostales/:Id_CodigoPostal/asentamientos/:Id_Asentamiento',checkToken, asentamientos.getUnique);

  return router;
}
