'use strict';

const pool = require('../config/database');

const ctrl = {};

ctrl.getAll = async(request,response)=>{
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision && request.Id_Ciudad){
    try {
      let consulta = `SELECT cp.* FROM DM_CodigosPostales cp
              INNER JOIN DM_Ciudades c
                ON cp.Id_Ciudad = c.Id_Ciudad
              INNER JOIN DM_PaisSubdivisiones ps
                ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Paises p
                ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND c.Id_Ciudad = ?
              AND cp.Id_Ciudad = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL
              AND cp.EliminadoFechaHora IS NULL`;

      let CodigosPostales = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision),Number(request.Id_Ciudad),Number(request.Id_Ciudad)]);

      if(CodigosPostales.length > 0){
        return response.status(200).json({
          status:'SUCCESS',
          CodigosPostales
        });
      }else{
        console.log(`que pedro`);
        return response.status(204).json({
          status:'FAILED'
        });
      }
    } catch (e) {
      console.log(e);
      return response.status(204).json({
        status:'FAILED'
      });
    }
  }else{
    return response.status(400).json({
      status:'FAILED'
    });
  }
};

ctrl.getUnique = async(request,response)=>{
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision && request.Id_Ciudad && request.Id_CodigoPostal){
    try {
      let consulta = `SELECT cp.* FROM DM_CodigosPostales cp
              INNER JOIN DM_Ciudades c
                ON cp.Id_Ciudad = c.Id_Ciudad
              INNER JOIN DM_PaisSubdivisiones ps
                ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Paises p
                ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND c.Id_Ciudad = ?
              AND cp.Id_Ciudad = ?
              AND cp.Id_CodigoPostal = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL
              AND cp.EliminadoFechaHora IS NULL`;

      let CodigosPostales = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision),Number(request.Id_Ciudad),Number(request.Id_Ciudad),Number(request.Id_CodigoPostal)]);

      if(CodigosPostales.length > 0){
        return response.status(200).json({
          status:'SUCCESS',
          CodigosPostales
        });
      }else{
        return response.status(204).json({
          status:'FAILED'
        });
      }
    } catch (e) {
      return response.status(204).json({
        status:'FAILED'
      });
    }
  }else{
    return response.status(400).json({
      status:'FAILED'
    });
  }
};

module.exports = ctrl;
