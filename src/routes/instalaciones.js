'use strict';

const router = require('express').Router();

const {checkToken} = require('../middlewares/Auth');

const instalaciones = require('../controllers/instalaciones');

module.exports = app =>{
  app.route('/instalaciones')
     .get(checkToken,instalaciones.get)
     .post(checkToken,instalaciones.post)
     .put(checkToken,instalaciones.put)
     .delete(checkToken,instalaciones.delete);
}
