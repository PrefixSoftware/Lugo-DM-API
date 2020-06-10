'use strict';

const router = require('express').Router({ mergeParams: true});

const login = require('../controllers/login');

const params = require('./params');

const tiposInstalacion = require('./tiposInstalacion');

const instalaciones = require('./instalaciones')

const zonasInstalacion = require('./zonasInstalacion')

const paises = require('./paises');

const paisSubdivisiones = require('./paisSubdivisiones');

const ciudades = require('./ciudades');

const codigosPostales = require('./codigosPostales');

const asentamientos = require('./asentamientos');

module.exports = app =>{

  // tiposInstalacion(app);
  // instalaciones(app);
  // zonasInstalacion(app);

  app.use(params(router));

  app.use(paises(router));
  app.use(paisSubdivisiones(router));
  app.use(ciudades(router));
  app.use(codigosPostales(router));
  app.use(asentamientos(router));

  app.post('/login', login.login)

  };
