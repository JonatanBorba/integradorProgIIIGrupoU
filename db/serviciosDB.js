import {conexion} from './conexion.js';

export default class ServiciosDB {

     agregarServicio = async(servicio) => {
        const [rows] = await conexion.query("INSERT INTO servicios (descripcion, importe) VALUES (?, ?)",
      [servicio.descripcion, servicio.importe]);
        return rows;

    };
    obtenerPorId = async(id) => {
        const [resultado] = await conexion.query('SELECT * FROM servicios WHERE servicio_id = ? and activo = 1', [id]);
        return resultado[0];
    };
    obtener = async() => {
        const [resultado] = await conexion.query('SELECT * FROM servicios WHERE activo = 1');
        return resultado;
    
    };
    modificarPorId = async(id, body) => {
        const {descripcion, importe} = body;
        const [resultado] = await conexion.query('UPDATE servicios SET descripcion = ?, importe = ? WHERE servicio_id = ?', [descripcion, importe, id]);
        return resultado.affectedRows>0 ? {id,descripcion,importe} : null;
    };
    eliminarPorId = async(id) => {
        const [resultado] = await conexion.query('UPDATE servicios SET activo = 0 WHERE servicio_id = ?', [id]);
        return resultado;
    };    
    

};


