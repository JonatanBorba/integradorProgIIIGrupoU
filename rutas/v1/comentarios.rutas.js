import { Router } from 'express';
import { check, param } from 'express-validator';
import ComentariosControlador from '../../controlador/comentarios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = Router();
const comentariosControlador = new ComentariosControlador();



// Agregar un comentario
router.post(
  '/',
  autorizarUsuarios([1,2]),
  [
    check('reserva_id', 'El ID de la reserva es obligatorio y debe ser numérico.').isInt({ min: 1 }),
    check('comentario', 'El comentario es obligatorio').trim().notEmpty().isString().isLength({ max: 500 }).withMessage('El comentario no puede superar los 500 caracteres.'),
    validarCampos
  ],
  comentariosControlador.crear
);

// Obtener comentarios de una reserva
router.get('/reserva/:reserva_id',autorizarUsuarios([1,2,3]), comentariosControlador.obtenerPorReserva);

// Actualizar un comentario (reserva_id en body)
router.put(
  '/:comentario_id',
  autorizarUsuarios([1,2]),
  [
    param('comentario_id', 'El ID del comentario debe ser numérico.').isInt({ min: 1 }),
    check('reserva_id', 'El ID de la reserva es obligatorio y debe ser numérico.').isInt({ min: 1 }),
    check('comentario', 'El comentario es obligatorio').trim().notEmpty().isString().isLength({ max: 500 }),
    validarCampos
  ],
  comentariosControlador.actualizar
);

// Actualizar un comentario por reserva (solo texto en body)
router.put(
  '/reserva/:reserva_id',
  autorizarUsuarios([1,2]),
  [
    param('reserva_id', 'El ID de la reserva debe ser numérico.').isInt({ min: 1 }),
    check('comentario', 'El comentario es obligatorio').trim().notEmpty().isString().isLength({ max: 500 }),
    validarCampos
  ],
  comentariosControlador.actualizarPorReserva
);

// Eliminar un comentario
router.delete('/:comentario_id', autorizarUsuarios([1,2]), comentariosControlador.eliminar);

export{router as comentariosRouter}