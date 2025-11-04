import express from 'express';
import TurnosControlador from '../../controlador/turnos.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const turnosControlador = new TurnosControlador();

router.get('/:id', autorizarUsuarios([1,2,3]), turnosControlador.getTurnoPorId);

export{router as turnosRouter};