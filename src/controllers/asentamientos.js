'use strict';

const pool = require('../config/database');

const ctrl = {};

ctrl.getAll = async(request,response)=>{
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision && request.Id_Ciudad && request.Id_CodigoPostal){
    try {
      let consulta = `SELECT a.* FROM DM_Asentamientos a
              INNER JOIN DM_CodigosPostales cp
              ON a.Id_CodigoPostal = cp.Id_CodigoPostal
              INNER JOIN DM_Ciudades c
              ON cp.Id_Ciudad = c.Id_Ciudad
              INNER JOIN DM_PaisSubdivisiones ps
              ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Pais p
              ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND c.Id_Ciudad = ?
              AND cp.Id_Ciudad = ?
              AND cp.Id_CodigoPostal = ?
              AND a.Id_CodigoPostal = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL
              AND cp.EliminadoFechaHora IS NULL
              AND a.EliminadoFechaHora IS NULL`;

      let Asentamientos = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision),Number(request.Id_Ciudad),Number(request.Id_Ciudad),Number(request.Id_CodigoPostal),Number(request.Id_CodigoPostal)]);

      if(Asentamientos.length > 0){
        return request.status(200).json({
          sttus:'SUCCESS',
          Asentamientos
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
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision && request.Id_Ciudad && request.Id_CodigoPostal && request.Id_Asentamiento){
    try {
      let consulta = `SELECT a.* FROM DM_Asentamientos a
              INNER JOIN DM_CodigosPostales cp
              ON a.Id_CodigoPostal = cp.Id_CodigoPostal
              INNER JOIN DM_Ciudades c
              ON cp.Id_Ciudad = c.Id_Ciudad
              INNER JOIN DM_PaisSubdivisiones ps
              ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Pais p
              ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND c.Id_Ciudad = ?
              AND cp.Id_Ciudad = ?
              AND cp.Id_CodigoPostal = ?
              AND a.Id_CodigoPostal = ?
              AND a.Id_Asentamiento = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL
              AND cp.EliminadoFechaHora IS NULL
              AND a.EliminadoFechaHora IS NULL`;

      let Asentamientos = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision),Number(request.Id_Ciudad),Number(request.Id_Ciudad),Number(request.Id_CodigoPostal),Number(request.Id_CodigoPostal), Number(request.Id_Asentamiento)]);

      if(Asentamientos.length > 0){
        return request.status(200).json({
          sttus:'SUCCESS',
          Asentamientos
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
