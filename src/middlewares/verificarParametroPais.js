const pool = require('../config/database')

let verificarParametroPais = async (request,response,next,Id_Pais)=>{
  if(Number(Id_Pais)){

    this.Id_Pais = Id_Pais;

    if(Id_Pais){
      let consulta =`SELECT Id_Pais FROM DM_Paises WHERE Id_Pais = ? AND EliminadoFechaHora IS NULL`;

      Id_Pais = await pool.query(consulta,[Id_Pais]);

      if(Id_Pais.length === 1){

        request.Id_Pais = Id_Pais[0].Id_Pais;
        next()
      }else{
        return response.status(401).json({
          status:"NO EXISTE PAIS"
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
  verificarParametroPais
}
