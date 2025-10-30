import express from 'express';
import TurnosControlador from '../../controlador/turnos.controlador.js';

const router = express.Router();

const turnosControlador = new TurnosControlador();


router.get('/:id', turnosControlador.getTurnoPorId);

export{router as turnosRouter};