'use strict';

const router = require('express').Router();

const zonasInstalacion = require('../controllers/zonasInstalacion');

const {checkToken} = require('../middlewares/Auth')

module.exports = app =>{

  app.route('/zonasInstalacion')
     .get(checkToken,zonasInstalacion.get)
     .post(checkToken,zonasInstalacion.post)
     .put(checkToken,zonasInstalacion.put)
     .delete(checkToken,zonasInstalacion.delete);
};
