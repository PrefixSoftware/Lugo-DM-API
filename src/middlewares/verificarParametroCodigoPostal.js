const pool = require('../config/database')

let verificarParametroCodigoPostal = async (request,response,next,Id_CodigoPostal)=>{
  if(Number(Id_CodigoPostal)){

    this.Id_CodigoPostal = Id_CodigoPostal;

    if(Id_CodigoPostal){
      let consulta =`SELECT Id_CodigoPostal FROM DM_CodigosPostales WHERE Id_CodigoPostal = ? AND EliminadoFechaHora IS NULL`;

      Id_CodigoPostal = await pool.query(consulta,[Id_CodigoPostal]);

      if(Id_CodigoPostal.length === 1){

        request.Id_CodigoPostal = Id_CodigoPostal[0].Id_CodigoPostal;
        next()
      }else{
        return response.status(401).json({
          status:"NO EXISTE CODIGOPOSTAL"
        });
      }
    }else{
      return response.status(401).json({
        status:"NO COINCIDEN DATOS!"
      });
    }
  }else{
    return response.status(401).json({
      status:"DATO INVALIDO"
    });
  }
}

module.exports = {
  verificarParametroCodigoPostal
}
