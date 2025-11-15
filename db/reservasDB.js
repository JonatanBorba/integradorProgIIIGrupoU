import { conexion } from "./conexion.js";

export default class Reservas {

    buscarPropias = async(usuario_id) => {
        const sql = 'SELECT * FROM reservas WHERE activo = 1 AND usuario_id = ?';
        const [reservas] = await conexion.execute(sql, [usuario_id]);
        return reservas;
    }
    
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

    actualizar = async(reserva_id, datos) => {
        const {
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_salon,
            importe_total
        } = datos;

        const sql = `UPDATE reservas 
            SET fecha_reserva = ?, salon_id = ?, usuario_id = ?, turno_id = ?, foto_cumpleaniero = ?, tematica = ?, importe_salon = ?, importe_total = ?
            WHERE reserva_id = ?`;

        const [result] = await conexion.execute(sql, [
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_salon,
            importe_total,
            reserva_id
        ]);

        return result.affectedRows > 0;
    }

    
    datosParaNotificacion = async(reserva_id) => {
        try {
            const sql = `CALL obtenerDatosNotificacion(?)`;
            const [result] = await conexion.execute(sql, [reserva_id]);
            const fila = Array.isArray(result) ? (Array.isArray(result[0]) ? result[0][0] : result[0]) : result;
            if(!fila){
                return null;
            }
            return fila;
        } catch (error) {
            if (error?.code === 'ER_SP_DOES_NOT_EXIST') {
                const fallbackSql = `
                    SELECT 
                        r.fecha_reserva AS fecha,
                        s.titulo AS salon,
                        CAST(t.turno_id AS CHAR) AS turno,
                        u.nombre_usuario AS correoElectronico
                    FROM reservas r
                    INNER JOIN salones s ON s.salon_id = r.salon_id
                    INNER JOIN turnos t ON t.turno_id = r.turno_id
                    INNER JOIN usuarios u ON u.usuario_id = r.usuario_id
                    WHERE r.reserva_id = ?
                    LIMIT 1
                `;
                const [rows] = await conexion.query(fallbackSql, [reserva_id]);
                return rows && rows[0] ? rows[0] : null;
            }
            throw error;
        }
    }

    buscarDatosReporteCsv = async() => {
        try {
            const sql = `CALL reporte_csv()`;
            const [result] = await conexion.query(sql);
            return result[0];
        } catch (error) {
            if (error?.code === 'ER_SP_DOES_NOT_EXIST') {
                const fallbackSql = `
                    SELECT 
                        r.fecha_reserva,
                        s.titulo,
                        r.reserva_id AS orden
                    FROM reservas r
                    INNER JOIN salones s ON s.salon_id = r.salon_id
                    WHERE r.activo = 1
                    ORDER BY r.fecha_reserva DESC, r.reserva_id DESC
                `;
                const [rows] = await conexion.query(fallbackSql);
                return rows;
            }
            throw error;
        }
    }

    eliminarPorId = async(id) => {
        const sql = "UPDATE reservas SET activo = 0 WHERE reserva_id = ?";
        const [resultado] = await conexion.execute(sql, [id]);
         return resultado.affectedRows > 0;
     };    
    

}


