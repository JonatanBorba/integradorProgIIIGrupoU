import TurnosDB from "../db/turnosDB.js";

export default class TurnosServicios {
    constructor () {
        this.turnosDB = new TurnosDB();

    }
   
    obtenerTurno = async(id) => {
         try {
            return await this.turnosDB.obtenerPorId(id);
        }catch (error) {
            throw new Error('Error al obtener los turnos: ' + error.message);
        }
     };
    
    listarTurnos = async() => {
        try {
            return await this.turnosDB.listarTodos();
        } catch (error) {
            throw new Error('Error al listar los turnos: ' + error.message);
        }    

};          

}