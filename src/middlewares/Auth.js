// ==================================================================================
// CHECK JSON WEB TOKEN
// Notes:
//      - Must be the first middleware in the routes.
//      - Adds an object (user) to the request.
// ==================================================================================



// ==================================================================================
// Dependencies
// ==================================================================================

const jwt = require('jsonwebtoken');

const pool = require('../config/database')

require('../config/config');

// ==================================================================================
// checkToken function - middleware
// ==================================================================================
let checkToken = async(req, res, next) => {
    let token = req.get('token');
    await jwt.verify(token, process.env.seed, async (err, decoded) => {
        // console.log(err);
        if (err) {
          console.log(err);
            return res.status(401).json({
                err
            });
        }

        let consulta = `SELECT Id_Usuario, CorreoElectronico FROM USR_Usuarios WHERE Id_Usuario = ? AND EliminadoFechaHora IS NULL`;

        let Id_Usuario = await pool.query(consulta,[decoded.Id_Usuario]);

        if(Id_Usuario.length === 1){
          if (decoded.Id_Usuario === req.Id_Usuario) {

            req.Usuario = {
              Id_Usuario: decoded.Id_Usuario,
              CorreoElectronico: decoded.CorreoElectronico
            }
            next();
          }else{
            if(process.env.NODE_ENV==='production'){
                emailError(`No coinciden dicho Id (${decoded.Id_Usuario})`);
              }else {
                console.error(`No coinciden dicho Id (${decoded.Id_Usuario})`);
              }
              return res.status(404).json({
                status:`No coinciden dicho Id (${decoded.Id_Usuario})`
              });
          }
        }else{
          if(process.env.NODE_ENV==='production'){
              emailError(`No existe dicho Id (${decoded.Id_Usuario})`);
            }else {
              console.error(`No existe dicho Id (${decoded.Id_Usuario})`);
            }
            return res.status(401).json({
              status:`No existe dicho Id (${decoded.Id_Usuario})`
            });
        }
    });
};



// ==================================================================================
// Middleware export
// ==================================================================================

module.exports = {
    checkToken
};
