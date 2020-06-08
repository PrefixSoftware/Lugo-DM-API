const pool = require('../config/database')

let verificarParametroAsentamiento = async (request,response,next,Id_Asentamiento)=>{
  if(Number(Id_Asentamiento)){

    this.Id_Asentamiento = Id_Asentamiento;

    if(Id_Asentamiento){
      let consulta =`SELECT Id_Asentamiento FROM DM_Asentamientos WHERE Id_Asentamiento = ? AND EliminadoFechaHora IS NULL`;

      Id_Asentamiento = await pool.query(consulta,[Id_Asentamiento]);

      if(Id_Asentamiento.length === 1){

        request.Id_Asentamiento = Id_Asentamiento[0].Id_Asentamiento;
        next()
      }else{
        return response.status(401).json({
          status:"NO EXISTE ASENTAMIENTO"
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
  verificarParametroAsentamiento
}
