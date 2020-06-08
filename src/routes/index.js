'use strict';

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

  app.use(params);

  tiposInstalacion(app);
  instalaciones(app);
  zonasInstalacion(app);

  app.use(paises);
  app.use(paisSubdivisiones);
  app.use(ciudades);
  app.use(codigosPostales);
  app.use(asentamientos);

  app.post('/login', login.login)

  };
