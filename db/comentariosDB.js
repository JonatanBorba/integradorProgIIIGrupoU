import { conexion } from "./conexion.js";

export default class Comentarios {
  // Crear un nuevo comentario
  crear = async (comentarioData) => {
    const { reserva_id, usuario_id, comentario } = comentarioData;
    
    const sql = `INSERT INTO comentarios_reservas 
                (reserva_id, usuario_id, comentario) 
                VALUES (?, ?, ?)`;
    
    const [result] = await conexion.execute(sql, [
      reserva_id,
      usuario_id,
      comentario
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return this.buscarPorId(result.insertId);
  };

  // Obtener comentarios por reserva
  obtenerPorReserva = async (reserva_id) => {
    const sql = `SELECT c.*, u.nombre, u.apellido 
                FROM comentarios_reservas c
                JOIN usuarios u ON c.usuario_id = u.usuario_id
                WHERE c.reserva_id = ?
                ORDER BY c.fecha_creacion DESC`;
    
    const [comentarios] = await conexion.execute(sql, [reserva_id]);
    return comentarios;
  };

  // Obtener un comentario por su ID
  buscarPorId = async (comentario_id) => {
    const sql = `SELECT c.*, u.nombre, u.apellido 
                FROM comentarios_reservas c
                JOIN usuarios u ON c.usuario_id = u.usuario_id
                WHERE c.comentario_id = ?`;
    
    const [comentario] = await conexion.execute(sql, [comentario_id]);
    
    if (comentario.length === 0) {
      return null;
    }

    return comentario[0];
  };

  // Eliminación de un comentario
  eliminar = async (comentario_id) => {
    const sql = "DELETE FROM comentarios_reservas WHERE comentario_id = ?";
    const [result] = await conexion.execute(sql, [comentario_id]);
    return result.affectedRows > 0;
  };

  // Opcional: Actualizar un comentario
  actualizar = async (comentario_id, nuevoComentario) => {
    const sql = "UPDATE comentarios_reservas SET comentario = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE comentario_id = ?";
    const [result] = await conexion.execute(sql, [nuevoComentario, comentario_id]);
    
    if (result.affectedRows === 0) {
      return null;
    }

    return this.buscarPorId(comentario_id);
  };
}