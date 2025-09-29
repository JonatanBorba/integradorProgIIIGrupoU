import {conexion} from './conexion.js';

export default class ServiciosDB {

     obtener = async() => {
        const [rows] = await conexion.query('SELECT * FROM servicios');
        return rows;

    };
    obtenerPorId = async(id) => {
        const [resultado] = await conexion.query('SELECT * FROM servicios WHERE servicio_id = ?', [id]);
        return resultado[0];
    };
    agregar = async(body) => {
        {}
    };
    modificarPorId = async(id, body) => {
    };
    eliminarPorId = async(id) => {
    };    
};