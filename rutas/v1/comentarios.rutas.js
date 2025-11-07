import { Router } from 'express';
import ComentariosControlador from '../../controlador/comentarios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = Router();
const comentariosControlador = new ComentariosControlador();



// Agregar un comentario
router.post('/',autorizarUsuarios([1,2]),comentariosControlador.crear);

// Obtener comentarios de una reserva
router.get('/reserva/:reserva_id',autorizarUsuarios([1,2,3]), comentariosControlador.obtenerPorReserva);

// Actualizar un comentario (reserva_id en body)
router.put('/:comentario_id',autorizarUsuarios([1,2]), comentariosControlador.actualizar);

// Actualizar un comentario por reserva (solo texto en body)
router.put('/reserva/:reserva_id', autorizarUsuarios([1,2]), comentariosControlador.actualizarPorReserva);

// Eliminar un comentario
router.delete('/:comentario_id', autorizarUsuarios([1,2]), comentariosControlador.eliminar);

export{router as comentariosRouter}