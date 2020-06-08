'use strict';

const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ctrl = {};

ctrl.login = async (request, response, next)=>{
    let body = request.body;
    if (body.CorreoElectronico && body.Contrasena) {

      const password = crypto.createHash('sha256').update(crypto.createHash('sha256').update(body.Contrasena).digest('hex')).digest('hex');

        await pool.query('SELECT U.Id_Usuario, U.CorreoElectronico FROM USR_Usuarios U INNER JOIN USR_Contrasenas P ON U.Id_Usuario = P.Id_Usuario WHERE U.CorreoElectronico = ? AND P.Contrasena = ? AND U.EliminadoFechaHora IS NULL AND P.EliminadoFechaHora IS NULL LIMIT 1', [body.CorreoElectronico, password], (error, rows, fields) => {
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
                    Id_Usuario: rows[0].Id_Usuario,
                    CorreoElectronico: rows[0].CorreoElectronico,
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
