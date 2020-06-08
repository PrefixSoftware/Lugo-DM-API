'use strict';

const pool = require('../config/database');

const ctrl = {};

ctrl.getAll = async(request,response)=>{
  if(request.Usuario && request.Id_Pais){
    try {
      let consulta = `SELECT ps.* FROM DM_PaisSubdivisiones ps INNER JOIN DM_Pais p ON
            ps.Id_Pais = p.Id_Pais
            WHERE p.Id_Pais = ?
            AND p.EliminadoFechaHora IS NULL
            AND ps.EliminadoFechaHora IS NULL`;

      let PaisSubdivisiones = await pool.query(consulta,[Number(request.Id_Pais)]);

      if(PaisSubdivisiones.length > 0){
        return request.status(200).json({
          sttus:'SUCCESS',
          PaisSubdivisiones
        });
      }else{
        return request.status(204).json({
          status:'FAILED'
        });
      }
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
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision){
    try {
      let consulta = `SELECT * FROM DM_PaisSubdivisiones ps
              INNER JOIN DM_Pais p
              ON ps.Id_Pais=p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL`;

      let PaisSubdivisiones = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision)]);

      if(PaisSubdivisiones.length > 0){
        return request.status(200).json({
          sttus:'SUCCESS',
          PaisSubdivisiones
        });
      }else{
        return request.status(204).json({
          status:'FAILED'
        });
      }
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

module.exports = ctrl;
