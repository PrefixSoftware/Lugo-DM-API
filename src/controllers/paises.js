'use strict';

const ctrl = {};

const pool = require('../config/database');

ctrl.getAll = async(request,response)=>{
  if(request.Usuario){
    try {
      let consulta = `SELECT * FROM DM_Paises WHERE EliminadoFechaHora IS NULL`;

      let Paises = await pool.query(consulta);

      return request.status(200).json({
        sttus:'SUCCESS',
        Paises
      });

    } catch (e) {
      return request.status(204).json({
        status:'FAILED'
      });
    }
  }else{
    return request.status(400).json({
      status:'FAILED'
    });
  }
};

ctrl.getUnique = async(request,response)=>{
  if(request.Usuario && request.Id_Pais){
    try {
      let consulta = `SELECT * FROM DM_Paises WHERE Id_Pais = ? AND EliminadoFechaHora IS NULL`;

      let Paises = await pool.query(consulta,Number(request.Id_Pais));

      return request.status(200).json({
        sttus:'SUCCESS',
        Paises
      });

    } catch (e) {
      if(process.env.NODE_ENV==='production'){
        emailError(e);
      }else {
        console.error(e);
      }
      return request.status(204).json({
        status:'FAILED'
      });
    }
  }else{
    return request.status(400).json({
      status:'FAILED'
    });
  }
};

module.exports = ctrl;
