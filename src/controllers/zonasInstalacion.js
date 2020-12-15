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
    const consulta = `SELECT * FROM DM_ZonasInstalacion WHERE EliminadoFechaHora IS NULL`;

    const zonasInstalacion = await pool.query(consulta);

    return response.status(200).json({
      zonasInstalacion,
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
  if (Number(request.body.Id_Instalacion) && request.body.Nombre) {

    try {

      let consulta = `SELECT * FROM DM_Instalaciones WHERE Id_Instalacion = ?`;

      let Id_Instalacion = await pool.query(consulta,[Number(request.body.Id_Instalacion)]);

      if(Id_Instalacion.length === 1){

        Id_Instalacion = Id_Instalacion[0].Id_Instalacion;

          consulta = `INSERT INTO DM_ZonasInstalacion(Id_Instalacion, Nombre, Descripcion) VALUES (?, ?, ?)`;

          let result = await pool.query(consulta,[Id_Instalacion,request.body.Nombre, request.body.Descripcion]);

          return response.status(200).json({
            result:result,
            status:'SUCCESS'
          });


      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${Number(request.body.Id_Instalacion)})`);
        }else {
          console.error(`No existe dicho Id (${Number(request.body.Id_Instalacion)})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${Number(request.body.Id_Instalacion)})`
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

  if (Number(request.body.Id_ZonaInstalacion) && Number(request.body.Id_Instalacion) && request.body.Nombre) {

    try {

      let consulta = `SELECT * FROM DM_ZonasInstalacion WHERE Id_ZonaInstalacion = ?`;

      let Id_ZonaInstalacion = await pool.query(consulta,[Number(request.body.Id_ZonaInstalacion)]);

      if(Id_ZonaInstalacion.length === 1){

        Id_ZonaInstalacion = Id_ZonaInstalacion[0].Id_ZonaInstalacion;

        consulta = `SELECT * FROM DM_Instalaciones WHERE Id_Instalacion = ?`;

        let Id_Instalacion = await pool.query(consulta,[Number(request.body.Id_Instalacion)]);

        if(Id_Instalacion.length === 1){

          Id_Instalacion = Id_Instalacion[0].Id_Instalacion;

            let zonasInstalacion = {
              Id_Instalacion,
              Nombre:request.body.Nombre,
              Descripcion: request.body.Descripcion
            }

            consulta = `UPDATE DM_ZonasInstalacion SET ? WHERE Id_ZonaInstalacion = ?`;

            const result = await pool.query(consulta,[zonasInstalacion,Id_ZonaInstalacion]);

            return response.status(200).json({
              result:result,
              status:'SUCCESS'
            });

        }else{
          if(process.env.NODE_ENV==='production'){
            emailError(`No existe dicho Id (${Number(request.body.Id_Instalacion)})`);
          }else {
            console.error(`No existe dicho Id (${Number(request.body.Id_Instalacion)})`);
          }
          return response.status(404).json({
            status:`No existe dicho Id (${Number(request.body.Id_Instalacion)})`
          });
        }

      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_ZonaInstalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_ZonaInstalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_ZonaInstalacion})`
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

  if (Number(request.body.Id_ZonaInstalacion)) {

    try {

      let consulta = `SELECT * FROM DM_ZonasInstalacion WHERE Id_ZonaInstalacion = ? LIMIT 1`;

      let Id_ZonaInstalacion = await pool.query(consulta,[Number(request.body.Id_ZonaInstalacion)]);

      if(Id_ZonaInstalacion.length === 1){

        Id_ZonaInstalacion = Id_ZonaInstalacion[0].Id_ZonaInstalacion;

        let zonasInstalacion = {
          RegistroActivo: 0
        }

        consulta = `UPDATE DM_ZonasInstalacion SET ? WHERE Id_ZonaInstalacion = ?`;

        const result = await pool.query(consulta,[zonasInstalacion,Id_ZonaInstalacion]);

        return response.status(200).json({
          result:result,
          status:'SUCCESS'
        });

      }else{
        if(process.env.NODE_ENV==='production'){
          emailError(`No existe dicho Id (${request.body.Id_ZonaInstalacion})`);
        }else {
          console.error(`No existe dicho Id (${request.body.Id_ZonaInstalacion})`);
        }
        return response.status(404).json({
          status:`No existe dicho Id (${request.body.Id_ZonaInstalacion})`
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
