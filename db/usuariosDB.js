import {conexion} from './conexion.js';

export default class UsuariosDB {

     agregarUsuario = async({nombre, apellido, nombre_usuario, contrasenia,tipo_usuario}) => {
        const [rows] = await conexion.query("INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, nombre_usuario, contrasenia,tipo_usuario]);
        return rows;

    };
    obtenerPorId = async(id) => {
        const [resultado] = await conexion.query('SELECT * FROM usuarios WHERE usuario_id = ? and activo = 1', [id]);
        return resultado[0];
    };
    obtener = async() => {
        const [resultado] = await conexion.query('SELECT * FROM usuarios WHERE activo = 1');
        return resultado;
    
    };
    modificarPorId = async(id, body) => {
        const {nombre, apellido, nombre_usuario, contrasenia, tipo_usuario} = body;
        const [resultado] = await conexion.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, nombre_usuario = ?, contrasenia = ?, tipo_usuario = ? WHERE usuario_id = ?',
            [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, id]
        );
        return resultado.affectedRows>0 ? {id, nombre, apellido, nombre_usuario, contrasenia, tipo_usuario} : null;
    };
    eliminarPorId = async(id) => {
        const [resultado] = await conexion.query('UPDATE usuarios SET activo = 0 WHERE usuario_id = ?', [id]);
        return resultado;
    };    
    
    ValidarPorEmail = async(eMail) => {
        const [resultado] = await conexion.query('SELECT * FROM usuarios WHERE nombre_usuario = ? and activo = 1', [eMail]);
        return resultado[0];
    };

};