import express from 'express';
import ServiciosControlador from '../../controlador/servicios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';
import { validarCampos } from '../../middlewares/validarCampos.js';
import { check, param } from 'express-validator';

const router = express.Router();

const serviciosControlador = new ServiciosControlador();

router.post(
  '/',
  autorizarUsuarios([1,2]),
  [
    check('descripcion', 'La descripción es obligatoria').trim().notEmpty().isString(),
    check('importe', 'El importe es obligatorio y debe ser numérico').notEmpty().isFloat({ gt: 0 }),
    validarCampos
  ],
  serviciosControlador.postServicios
);

router.get(
  '/:id',
  autorizarUsuarios([1,2,3]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    validarCampos
  ],
  serviciosControlador.getServiciosPorId
);

router.get('/', autorizarUsuarios([1,2,3]), serviciosControlador.getServicios);

router.put(
  '/:id',
  autorizarUsuarios([1,2]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    check('descripcion', 'La descripción es obligatoria').optional().trim().notEmpty().isString(),
    check('importe', 'El importe debe ser numérico').optional().isFloat({ gt: 0 }),
    validarCampos
  ],
  serviciosControlador.putServiciosPorId
);

router.delete(
  '/:id',
  autorizarUsuarios([1,2]),
  [
    param('id', 'El ID debe ser numérico.').isInt({ min: 1 }),
    validarCampos
  ],
  serviciosControlador.deleteServiciosPorId
);

export{router as serviciosRouter};