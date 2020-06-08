const pool = require('../config/database')

let verificarParametroPaisSubdivision = async (request,response,next,Id_PaisSubdivision)=>{
  if(Number(Id_PaisSubdivision)){

    this.Id_PaisSubdivision = Id_PaisSubdivision;

    if(Id_PaisSubdivision){
      let consulta =`SELECT Id_PaisSubdivision FROM DM_PaisSubdivisiones WHERE Id_PaisSubdivision = ? AND EliminadoFechaHora IS NULL`;

      Id_PaisSubdivision = await pool.query(consulta,[Id_PaisSubdivision]);

      if(Id_PaisSubdivision.length === 1){

        request.Id_PaisSubdivision = Id_PaisSubdivision[0].Id_PaisSubdivision;
        next()
      }else{
        return response.status(401).json({
          status:"NO EXISTE PAISSUBDIVISION"
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
  verificarParametroPaisSubdivision
}
