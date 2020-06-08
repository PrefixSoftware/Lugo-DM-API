const pool = require('../config/database')

let verificarParametroCiudad = async (request,response,next,Id_Ciudad)=>{
  if(Number(Id_Ciudad)){

    this.Id_Ciudad = Id_Ciudad;

    if(Id_Ciudad){
      let consulta =`SELECT Id_Ciudad FROM DM_Ciudades WHERE Id_Ciudad = ? AND EliminadoFechaHora IS NULL`;

      Id_Ciudad = await pool.query(consulta,[Id_Ciudad]);

      if(Id_Ciudad.length === 1){

        request.Id_Ciudad = Id_Ciudad[0].Id_Ciudad;
        next()
      }else{
        return response.status(401).json({
          status:"NO EXISTE CIUDAD"
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
  verificarParametroCiudad
}
