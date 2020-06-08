'use strict';

const pool = require('../config/database');

const emailError = require('../util/emailError');

const ctrl = {};

///////////////////////
///////
/////// GET
///////
//////////////////////
ctrl.get = async (request,response) => {
  try {
    const consulta = `SELECT * FROM DM_TiposInstalacion WHERE RegistroActivo = 1`;

    const tiposInstalacion = await pool.query(consulta);

    return response.status(200).json({
      tiposInstalacion,
      status:'SUCCESS'
    });

  } catch (e) {
    if(process.env.NODE_ENV==='production'){
      emailError(e);
    }else {
      console.error(e);
    }
    return response.status(404).json({
      status:"FAILED"
    });
  }
};

///////////////////////
///////
/////// POST
///////
//////////////////////
ctrl.post = async (request, response) =>{
  if(request.body.Nombre){
    try {
      const consulta = `INSERT INTO DM_TiposInstalacion(Nombre, Descripcion) VALUES (?, ?)`;

      const result = await pool.query(consulta,[request.body.Nombre,request.body.Descripcion]);

      return response.status(200).json({
        result,
        status:'SUCCESS'
      });
    } catch (e) {
      if(process.env.NODE_ENV==='production'){
        emailError(e);
      }else {
        console.error(e);
      }
      return response.status(404).json({
        status:"FAILED"
      });
    }
  }else{
    if(process.env.NODE_ENV==='production'){
      emailError('Faltan Campos!');
    }else {
      console.log('Faltan Campos!');
    }
    return response.status(404).json({
      status:"Faltan Campos!"
    });
  }
};

///////////////////////
///////
/////// PUT
///////
//////////////////////
ctrl.put = async (request, response) =>{
  if(Number(request.body.Id_TipoInstalacion) && request.body.Nombre){
    try {

      let consulta = `SELECT * FROM DM_TiposInstalacion WHERE Id_TipoInstalacion = ?`;

      let Id_TipoInstalacion = await pool.query(consulta,[Number(request.body.Id_TipoInstalacion)]);

      if(Id_TipoInstalacion.length === 1){

        Id_TipoInstalacion = Id_TipoInstalacion[0].Id_TipoInstalacion;

        let tiposInstalacion = {
          Nombre:request.body.Nombre,
          Descripcion:request.body.Descripcion
        }

        consulta = `UPDATE DM_TiposInstalacion SET ? WHERE Id_TipoInstalacion = ?`;

        const result = await pool.query(consulta,[tiposInstalacion,Id_TipoInstalacion]);

        return response.status(200).json({
          result,
          status:'SUCCESS'
        });
      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_TipoInstalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_TipoInstalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_TipoInstalacion})`
        });
      }

    } catch (e) {
      if(process.env.NODE_ENV==='production'){
        emailError(e);
      }else {
        console.error(e);
      }
      return response.status(404).json({
        status:"FAILED"
      });
    }
  }else{
    if(process.env.NODE_ENV==='production'){
      emailError('Faltan Campos!');
    }else {
      console.log('Faltan Campos!');
    }
    return response.status(404).json({
      status:"Faltan Campos!"
    });
  }
};

///////////////////////
///////
/////// DELETE
///////
//////////////////////
ctrl.delete = async (request, response) =>{
  if(Number(request.body.Id_TipoInstalacion)){
    try {

      let consulta = `SELECT * FROM DM_TiposInstalacion WHERE Id_TipoInstalacion = ?`;

      let Id_TipoInstalacion = await pool.query(consulta,[Number(request.body.Id_TipoInstalacion)]);

      if(Id_TipoInstalacion.length === 1){

        Id_TipoInstalacion = Id_TipoInstalacion[0].Id_TipoInstalacion;

        let tiposInstalacion = {
          RegistroActivo:0
        }

        consulta = `UPDATE DM_TiposInstalacion SET ? WHERE Id_TipoInstalacion = ?`;

        const result = await pool.query(consulta,[tiposInstalacion,Id_TipoInstalacion]);

        return response.status(200).json({
          result,
          status:'SUCCESS'
        });
      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_TipoInstalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_TipoInstalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_TipoInstalacion})`
        });
      }

    } catch (e) {
      if(process.env.NODE_ENV==='production'){
        emailError(e);
      }else {
        console.error(e);
      }
      return response.status(404).json({
        status:"FAILED"
      });
    }
  }else{
    if(process.env.NODE_ENV==='production'){
      emailError('Faltan Campos!');
    }else {
      console.log('Faltan Campos!');
    }
    return response.status(404).json({
      status:"Faltan Campos!"
    });
  }
};


module.exports = ctrl;
