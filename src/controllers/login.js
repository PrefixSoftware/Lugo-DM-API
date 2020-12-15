'use strict';

const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ctrl = {};

ctrl.login = async (request, response, next)=>{
    let body = request.body;
    if (body.CorreoElectronico && body.Contrasena) {

      const password = crypto.createHash('sha256').update(crypto.createHash('sha256').update(body.Contrasena).digest('hex')).digest('hex');

      let consulta = `SELECT * FROM DM_PersonaInfo_View
              INNER JOIN USR_Contrasenas c
              ON DM_PersonaInfo_View.Id_Usuario = c.Id_Usuario
              WHERE DM_PersonaInfo_View.CorreoElectronico = ?
              AND c.Contrasena = ?
              AND c.EliminadoFechaHora IS NULL LIMIT 1`

        await pool.query(consulta, [body.CorreoElectronico, password], (error, rows, fields) => {
            if (error) {
                return response.status(500).json({
                    error: `ERROR DATABASE -> ${error}`
                });
            }
            if (rows.length > 0) {
                let token = jwt.sign({
                    CorreoElectronico: rows[0].CorreoElectronico,
                    Id_Usuario: rows[0].Id_Usuario
                }, process.env.seed, { expiresIn: process.env.ERP_TOKEN_EXPIRY_DATE });
                request.Usuario = {
                    Id_Usuario: rows[0].Id_Usuario,
                    CorreoElectronico: rows[0].CorreoElectronico
                }
                return response.status(200).json({
                    Usuario:Usuario[0],
                    token: token
                });
            } else {

                return response.status(200).json({
                    error: 'No User'
                });
            }


        });
    } else {
        return response.status(400).json({
            error: 'Faltan datos'
        });
    }

    console.log('End Login Request');
  }

  module.exports = ctrl;
