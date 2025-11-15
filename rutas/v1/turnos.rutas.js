import {param} from 'express-validator';
import express from 'express';
import TurnosControlador from '../../controlador/turnos.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();

const turnosControlador = new TurnosControlador();

router.get(
  '/:id',
  autorizarUsuarios([1,2,3]),
  [
    param('id', 'El ID debe ser un número entero válido.').isInt({ min: 1 }),
    validarCampos
  ],
  turnosControlador.getTurnoPorId
);

export{router as turnosRouter};