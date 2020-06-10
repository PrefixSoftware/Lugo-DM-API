'use strict';

const pool = require('../config/database');

const ctrl = {};

ctrl.getAll = async(request,response)=>{
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision){
    try {
      let consulta = `SELECT c.* FROM DM_Ciudades c
              INNER JOIN DM_PaisSubdivisiones ps
                ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Paises p
                ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL`;

      let Ciudades = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision)]);

      if(Ciudades.length > 0){
        return response.status(200).json({
          status:'SUCCESS',
          Ciudades
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

ctrl.getUnique = async(request,response)=>{
  if(request.Usuario && request.Id_Pais && request.Id_PaisSubdivision && request.Id_Ciudad){
    try {
      let consulta = `SELECT c.* FROM DM_Ciudades c
              INNER JOIN DM_PaisSubdivisiones ps
                ON c.Id_PaisSubdivision=ps.Id_PaisSubdivision
              INNER JOIN DM_Paises p
                ON ps.Id_Pais = p.Id_Pais
              WHERE p.Id_Pais = ?
              AND ps.Id_PaisSubdivision = ?
              AND c.Id_PaisSubdivision = ?
              AND c.Id_Ciudad = ?
              AND ps.EliminadoFechaHora IS NULL
              AND p.EliminadoFechaHora IS NULL
              AND c.EliminadoFechaHora IS NULL`;

      let Ciudades = await pool.query(consulta,[Number(request.Id_Pais),Number(request.Id_PaisSubdivision),Number(request.Id_PaisSubdivision),Number(request.Id_Ciudad)]);

      if(Ciudades.length > 0){
        return response.status(200).json({
          status:'SUCCESS',
          Ciudades
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
