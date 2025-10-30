import { conexion } from "./conexion.js";

export default class Reservas {

    buscarTodos = async() => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1';
        const [reservas] = await conexion.execute(sql);
        return reservas;
    }

    buscarPorId = async(reserva_id) => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1 AND reserva_id = ?';
        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if(reserva.length === 0){
            return null;
        }

        return reserva[0];
    }

    crear = async(reserva) => {
        const {
                fecha_reserva,
                salon_id,
                usuario_id,
                turno_id,
                foto_cumpleaniero, 
                tematica,
                importe_salon,
                importe_total 
            } = reserva;
        
        const sql = `INSERT INTO reservas 
            (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total) 
            VALUES (?,?,?,?,?,?,?,?)`;
        
        const [result] = await conexion.execute(sql, 
            [fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total]);

        if (result.affectedRows === 0){
            return null;
        }

        return this.buscarPorId(result.insertId);
    }

    
    datosParaNotificacion = async(reserva_id) => {
        const sql = `SELECT 
                r.fecha_reserva as fecha,
                s.titulo as salon,
                t.orden as turno,
                u.nombre_usuario as correoElectronico
            FROM reservas as r
            INNER JOIN salones as s on s.salon_id = r.salon_id 
            INNER JOIN turnos as t on t.turno_id = r.turno_id
            INNER JOIN usuarios as u on u.usuario_id = r.usuario_id
            WHERE r.activo = 1 and r.reserva_id = ?`;

        const [reserva] = await conexion.execute(sql, [reserva_id]);
        if(reserva.length === 0){
            return null;
        }

        return reserva[0];
    }
}// import {conexion} from './conexion.js';

// export default class ReservasDB {

//      agregarReserva = async(reservas) => {
//         const [rows] = await conexion.query("INSERT INTO reservas (fecha_reserva, salon_id, usuario_id, tematica, importe_total) VALUES (?, ?, ?, ?, ?)",
//       [reservas.fecha_reserva, reservas.salon_id, reservas.usuario_id, reservas.tematica, reservas.importe_total]);
//         return rows;

//     };
//     obtenerPorId = async(id) => {
//         const [resultado] = await conexion.query('SELECT * FROM reservas WHERE reserva_id = ? and activo = 1', [id]);
//         return resultado[0];
//     };
//     obtener = async() => {
//         const [resultado] = await conexion.query('SELECT * FROM reservas WHERE activo = 1');
//         return resultado;
    
//     };
//     modificarPorId = async(id, body) => {
//         const {fecha_reserva, salon_id, usuario_id, tematica, importe_total} = body;
//         const [resultado] = await conexion.query('UPDATE reservas SET fecha_reserva = ?, salon_id = ? usuario_id = ? tematica = ? importe_total = ? WHERE reservas_id = ?', [fecha_reserva, salon_id, usuario_id, tematica, importe_total, id]);
//         return resultado.affectedRows>0 ? {reservas_id,fecha_reserva, salon_id, usuario_id, tematica, importe_total} : null;
//     };
//     eliminarPorId = async(id) => {
//         const [resultado] = await conexion.query('DELETE FROM reservas WHERE servicio_id = ?', [id]);
//         return resultado;
//     };    
    

// };


