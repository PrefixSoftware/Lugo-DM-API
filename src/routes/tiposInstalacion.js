'use strict';

const router = require('express').Router();

const tiposInstalacion = require('../controllers/tiposInstalacion');

const {checkToken} = require('../middlewares/Auth');

module.exports = app =>{

  app.route('/tiposInstalacion')
     .get(checkToken,tiposInstalacion.get)
     .post(checkToken,tiposInstalacion.post)
     .put(checkToken,tiposInstalacion.put)
     .delete(checkToken,tiposInstalacion.delete);
}
