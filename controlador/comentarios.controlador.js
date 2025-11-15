import ComentariosServicio from '../servicios/comentarios.servicios.js';

export default class ComentariosControlador {
  constructor() {
    this.comentariosServicio = new ComentariosServicio();
  }

  // Crear un nuevo comentario
  crear = async (req, res) => {
    try {
      const { reserva_id, comentario } = req.body;
      const usuario_id = req.user.usuario_id;

      const resultado = await this.comentariosServicio.crear({
        reserva_id,
        usuario_id,
        comentario,
      });

      if (resultado.success) {
        return res.status(201).json({
          estado: true,
          mensaje: 'Comentario agregado correctamente',
          data: resultado.data,
        });
      } else {
        return res.status(400).json({
          estado: false,
          mensaje: resultado.message || 'No se pudo agregar el comentario',
        });
      }
    } catch (error) {
      console.error('Error en ComentariosControlador.crear:', error);
      return res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor al crear el comentario',
        error: error.message,
      });
    }
  };

  // Actualizar comentario por reserva (solo texto en body)
  actualizarPorReserva = async (req, res) => {
    try {
      const { reserva_id } = req.params;
      const { comentario: nuevoComentario } = req.body;
      const usuario_id = req.user.usuario_id;
      const esAdmin = req.user.tipo_usuario === 1;

     

      const resultado = await this.comentariosServicio.actualizarPorReserva(
        reserva_id,
        usuario_id,
        nuevoComentario,
        esAdmin
      );

      if (resultado.success) {
        return res.json({
          estado: true,
          mensaje: 'Comentario actualizado correctamente',
          data: resultado.data,
        });
      } else {
        return res.status(400).json({
          estado: false,
          mensaje: resultado.message || 'No se pudo actualizar el comentario',
        });
      }
    } catch (error) {
      console.error('Error en ComentariosControlador.actualizarPorReserva:', error);
      return res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor al actualizar el comentario',
        error: error.message,
      });
    }
  };

  // Obtener comentarios por reserva
  obtenerPorReserva = async (req, res) => {
    try {
      const { reserva_id } = req.params;
      
    

      const resultado = await this.comentariosServicio.obtenerPorReserva(reserva_id);

      if (resultado.success) {
        return res.json({
          estado: true,
          comentarios: resultado.data,
        });
      } else {
        return res.status(400).json({
          estado: false,
          mensaje: resultado.message || 'No se pudieron obtener los comentarios',
        });
      }
    } catch (error) {
      console.error('Error en ComentariosControlador.obtenerPorReserva:', error);
      return res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor al obtener los comentarios',
        error: error.message,
      });
    }
  };

  // Eliminar un comentario
  eliminar = async (req, res) => {
    try {
      const { comentario_id } = req.params;
      const usuario_id = req.user.usuario_id;
      const esAdmin = req.user.tipo_usuario === 1; 
    

      const resultado = await this.comentariosServicio.eliminar(
        comentario_id, 
        usuario_id, 
        esAdmin
      );

      if (resultado.success) {
        return res.json({
          estado: true,
          mensaje: resultado.message || 'Comentario eliminado correctamente',
        });
      } else {
        return res.status(400).json({
          estado: false,
          mensaje: resultado.message || 'No se pudo eliminar el comentario',
        });
      }
    } catch (error) {
      console.error('Error en ComentariosControlador.eliminar:', error);
      return res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor al eliminar el comentario',
        error: error.message,
      });
    }
  };

  // Opcional: Actualizar un comentario
  actualizar = async (req, res) => {
    try {
      const { comentario_id } = req.params;
      const { reserva_id, comentario: nuevoComentario } = req.body;
      const usuario_id = req.user.usuario_id;
      const esAdmin = req.user.tipo_usuario === 1; 
   
      const resultado = await this.comentariosServicio.actualizar(
        comentario_id,
        usuario_id,
        reserva_id,
        nuevoComentario,
        esAdmin
      );

      if (resultado.success) {
        return res.json({
          estado: true,
          mensaje: 'Comentario actualizado correctamente',
          data: resultado.data,
        });
      } else {
        return res.status(400).json({
          estado: false,
          mensaje: resultado.message || 'No se pudo actualizar el comentario',
        });
      }
    } catch (error) {
      console.error('Error en ComentariosControlador.actualizar:', error);
      return res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor al actualizar el comentario',
        error: error.message,
      });
    }
  };
}