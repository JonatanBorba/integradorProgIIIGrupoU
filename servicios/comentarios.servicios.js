import ComentariosDB from '../db/comentariosDB.js';

export default class ComentariosServicio {
  constructor() {
    this.comentariosDB = new ComentariosDB();
  }

  // Actualizar por reserva (1 comentario por reserva): solo texto
  async actualizarPorReserva(reserva_id, usuario_id, nuevoComentario, esAdmin = false) {
    try {
      if (!reserva_id || !nuevoComentario) {
        throw new Error('Faltan datos requeridos (reserva_id, comentario)');
      }

      const existentes = await this.comentariosDB.obtenerPorReserva(reserva_id);
      if (!existentes || existentes.length === 0) {
        throw new Error('No existe comentario para esta reserva');
      }

      const actual = existentes[0];

      if (String(actual.reserva_id) !== String(reserva_id)) {
        throw new Error('El comentario no pertenece a la reserva indicada');
      }

      if (actual.usuario_id !== usuario_id && !esAdmin) {
        throw new Error('No autorizado para actualizar este comentario');
      }

      const comentarioActualizado = await this.comentariosDB.actualizar(
        actual.comentario_id,
        nuevoComentario
      );

      if (!comentarioActualizado) {
        throw new Error('No se pudo actualizar el comentario');
      }

      return {
        success: true,
        data: comentarioActualizado
      };
    } catch (error) {
      console.error('Error en ComentariosServicio.actualizarPorReserva:', error);
      return {
        success: false,
        message: error.message || 'Error al actualizar el comentario por reserva'
      };
    }
  }

  // Crear un nuevo comentario
  async crear(comentarioData) {
    try {
      const { reserva_id, usuario_id, comentario } = comentarioData;

      // Validaciones básicas
      if (!reserva_id || !usuario_id || !comentario) {
        throw new Error('Faltan campos obligatorios');
      }

      if (comentario.length > 500) {
        throw new Error('El comentario no puede tener más de 500 caracteres');
      }

        
      const existentes = await this.comentariosDB.obtenerPorReserva(reserva_id);
      if (existentes && existentes.length > 0) {
        throw new Error('La reserva ya tiene un comentario');
      }

      const nuevoComentario = await this.comentariosDB.crear({
        reserva_id,
        usuario_id,
        comentario
      });

      if (!nuevoComentario) {
        throw new Error('No se pudo crear el comentario');
      }

      return {
        success: true,
        data: nuevoComentario
      };
    } catch (error) {
      console.error('Error en ComentariosServicio.crear:', error);
      return {
        success: false,
        message: error.message || 'Error al crear el comentario'
      };
    }
  }

  // Obtener comentarios por reserva
  async obtenerPorReserva(reserva_id) {
    try {
      if (!reserva_id) {
        throw new Error('Se requiere el ID de la reserva');
      }

      const comentarios = await this.comentariosDB.obtenerPorReserva(reserva_id);
      
      return {
        success: true,
        data: comentarios
      };
    } catch (error) {
      console.error('Error en ComentariosServicio.obtenerPorReserva:', error);
      return {
        success: false,
        message: error.message || 'Error al obtener los comentarios'
      };
    }
  }

  // Eliminar un comentario
  async eliminar(comentario_id, usuario_id, esAdmin = false) {
    try {
      if (!comentario_id) {
        throw new Error('Se requiere el ID del comentario');
      }

      // Verificar si el comentario existe
      const comentario = await this.comentariosDB.buscarPorId(comentario_id);
      if (!comentario) {
        throw new Error('Comentario no encontrado');
      }

      // Verificar permisos (solo el autor o un admin pueden eliminar)
      if (!esAdmin && comentario.usuario_id !== usuario_id) {
        throw new Error('No autorizado para eliminar este comentario');
      }

      const resultado = await this.comentariosDB.eliminar(comentario_id);
      
      if (!resultado) {
        throw new Error('No se pudo eliminar el comentario');
      }

      return { 
        success: true, 
        message: 'Comentario eliminado correctamente' 
      };
    } catch (error) {
      console.error('Error en ComentariosServicio.eliminar:', error);
      return {
        success: false,
        message: error.message || 'Error al eliminar el comentario'
      };
    }
  }

  // Opcional: Actualizar un comentario
  async actualizar(comentario_id, usuario_id, reserva_id, nuevoComentario, esAdmin = false) {
    try {
      if (!comentario_id || !reserva_id || !nuevoComentario) {
        throw new Error('Faltan datos requeridos (reserva_id, comentario)');
      }

      // Verificar si el comentario existe
      const comentario = await this.comentariosDB.buscarPorId(comentario_id);
      if (!comentario) {
        throw new Error('Comentario no encontrado');
      }

      // Validar que el comentario pertenezca a la reserva indicada
      if (String(comentario.reserva_id) !== String(reserva_id)) {
        throw new Error('El comentario no pertenece a la reserva indicada');
      }

      
      if (comentario.usuario_id !== usuario_id && !esAdmin) {
        throw new Error('No autorizado para actualizar este comentario');
      }

      const comentarioActualizado = await this.comentariosDB.actualizar(
        comentario_id, 
        nuevoComentario
      );

      if (!comentarioActualizado) {
        throw new Error('No se pudo actualizar el comentario');
      }

      return {
        success: true,
        data: comentarioActualizado
      };
    } catch (error) {
      console.error('Error en ComentariosServicio.actualizar:', error);
      return {
        success: false,
        message: error.message || 'Error al actualizar el comentario'
      };
    }
  }
}