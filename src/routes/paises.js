'use strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const paises = require('../controllers/paises');

router.get('/paises', checkToken, paises.getAll);

router.get('/paises/:Id_Pais', checkToken, paises.getUnique);

module.exports = router;
// module.exports = app =>{
//   app.route('/paises')
//      .get(checkToken,instalaciones.get)
//      .post(checkToken,instalaciones.post)
//      .put(checkToken,instalaciones.put)
//      .delete(checkToken,instalaciones.delete);
// }
