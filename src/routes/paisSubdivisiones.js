'useee strict';

const {checkToken} = require('../middlewares/Auth');

const paisSubdivisiones = require('../controllers/paisSubdivisiones');

module.exports = router => {

  router.get('/paises/:Id_Pais/subdivisiones',checkToken, paisSubdivisiones.getAll);

  router.get('/paises/:Id_Pais/subdivisiones/:Id_PaisSubdivision',checkToken, paisSubdivisiones.getUnique);

  return router;
};
