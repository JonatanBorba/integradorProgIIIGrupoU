import {conexion} from './conexion.js';

export default class TurnosDB {

  
    obtenerPorId = async(id) => {
        const [resultado] = await conexion.query('SELECT * FROM turnos WHERE turno_id = ? and activo = 1', [id]);
        return resultado[0];
    
    };
    listarTodos = async() => {
        const [resultado] = await conexion.query('SELECT * FROM turnos WHERE activo = 1');
        return resultado;
    }
    
};