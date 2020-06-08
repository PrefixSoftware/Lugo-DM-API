'use strict';

const pool = require('../config/database');

const emailError = require('../util/emailError');


const ctrl ={};

/////////////
/////
///// GET
/////
////////////

ctrl.get = async(request,response) =>{
  try {
    const consulta = `SELECT * FROM DM_Instalaciones WHERE RegistroActivo = 1`;

    const instalaciones = await pool.query(consulta);

    return response.status(200).json({
      instalaciones,
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
/////////////////////////
////
//// POST
////
////////////////////////

ctrl.post = async(request,response) =>{
  if (Number(request.body.Id_TipoInstalacion) && request.body.Nombre) {

    try {

      let consulta = `SELECT * FROM DM_TiposInstalacion WHERE Id_TipoInstalacion = ?`;

      let Id_TipoInstalacion = await pool.query(consulta,[Number(request.body.Id_TipoInstalacion)]);

      if(Id_TipoInstalacion.length === 1){

        Id_TipoInstalacion = Id_TipoInstalacion[0].Id_TipoInstalacion;

          consulta = `INSERT INTO DM_Instalaciones(Id_TipoInstalacion, Nombre, Descripcion) VALUES (?, ?, ?)`;

          let result = await pool.query(consulta,[Id_TipoInstalacion,request.body.Nombre, request.body.Descripcion]);

          return response.status(200).json({
            result:result,
            status:'SUCCESS'
          });


      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`);
        }else {
          console.error(`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`
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

/////////////////////////
////
//// PUT
////
////////////////////////

ctrl.put = async(request,response) =>{

  if (Number(request.body.Id_Instalacion) && Number(request.body.Id_TipoInstalacion) && request.body.Nombre) {

    try {

      let consulta = `SELECT * FROM DM_Instalaciones WHERE Id_Instalacion = ?`;

      let Id_Instalacion = await pool.query(consulta,[Number(request.body.Id_Instalacion)]);

      if(Id_Instalacion.length === 1){

        Id_Instalacion = Id_Instalacion[0].Id_Instalacion;

        consulta = `SELECT * FROM DM_TiposInstalacion WHERE Id_TipoInstalacion = ?`;

        let Id_TipoInstalacion = await pool.query(consulta,[Number(request.body.Id_TipoInstalacion)]);

        if(Id_TipoInstalacion.length === 1){

          Id_TipoInstalacion = Id_TipoInstalacion[0].Id_TipoInstalacion;

            let instalaciones = {
              Id_TipoInstalacion,
              Nombre:request.body.Nombre,
              Descripcion: request.body.Descripcion
            }

            consulta = `UPDATE DM_Instalaciones SET ? WHERE Id_Instalacion = ?`;

            const result = await pool.query(consulta,[instalaciones,Id_Instalacion]);

            return response.status(200).json({
              result:result,
              status:'SUCCESS'
            });

        }else{
          if(process.env.NODE_ENV==='production'){
            emailError(`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`);
          }else {
            console.error(`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`);
          }
          return response.status(404).json({
            status:`No existe dicho Id (${Number(request.body.Id_TipoInstalacion)})`
          });
        }

      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_Instalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_Instalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_Instalacion})`
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
      console.error('Faltan Campos!');
    }
    return response.status(404).json({
      status:"Faltan Campos!"
    });

  }
};

/////////////////////////
////
//// DELETE
////
////////////////////////

ctrl.delete = async(request,response) =>{

  if (Number(request.body.Id_Instalacion)) {

    try {

      let consulta = `SELECT * FROM DM_Instalaciones WHERE Id_Instalacion = ? LIMIT 1`;

      let Id_Instalacion = await pool.query(consulta,[Number(request.body.Id_Instalacion)]);

      if(Id_Instalacion.length === 1){

        Id_Instalacion = Id_Instalacion[0].Id_Instalacion;

        let instalaciones = {
          RegistroActivo: 0
        }

        consulta = `UPDATE DM_Instalaciones SET ? WHERE Id_Instalacion = ?`;

        const result = await pool.query(consulta,[instalaciones,Id_Instalacion]);

        return response.status(200).json({
          result:result,
          status:'SUCCESS'
        });

      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_Instalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_Instalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_Instalacion})`
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
      console.error('Faltan Campos!');
    }
    return response.status(404).json({
      status:"Faltan Campos!"
    });

  }
};

module.exports = ctrl;
