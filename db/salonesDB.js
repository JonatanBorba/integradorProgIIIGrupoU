import {conexion} from './conexion.js';

export default class SalonesDB {

     agregarSalon = async(salones) => {
        const [rows] = await conexion.query("INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?, ?, ?, ?)",
        [salones.titulo, salones.direccion, salones.capacidada, salones.importe]);
        return rows;

    };
    obtenerPorId = async(id) => {
        const [resultado] = await conexion.query('SELECT * FROM salones WHERE salon_id = ?', [id]);
        return resultado[0];
    };
    obtener = async() => {
        const [resultado] = await conexion.query('SELECT * FROM salones');
        return resultado;
    
    };
    modificarPorId = async(id, body) => {
        const {titulo, direccion, capacidad, importe} = body;
        const [resultado] = await conexion.query('UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ?', [titulo, direccion, capacidad, importe, id]);
        return resultado.affectedRows>0 ? {id,titulo,direccion,capacidad,importe} : null;
    };
    eliminarPorId = async(id) => {
        const [resultado] = await conexion.query('DELETE FROM salones WHERE salon_id = ?', [id]);
        return resultado;
    };    
    

};

