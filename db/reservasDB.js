// import {conexion} from './conexion.js';

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


