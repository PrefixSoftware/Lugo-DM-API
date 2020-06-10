'use strict';

const {checkToken} = require('../middlewares/Auth');

const paises = require('../controllers/paises');

module.exports = router=>{
  router.get('/paises/', checkToken, paises.getAll);

  router.get('/paises/:Id_Pais/', checkToken, paises.getUnique);

  return router;
};
