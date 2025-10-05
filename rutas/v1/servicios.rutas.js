import express from 'express';
import ServiciosControlador from '../../controlador/servicios.controlador.js';

const router = express.Router();

const serviciosControlador = new ServiciosControlador();

router.post('/', serviciosControlador.postServicios);

router.get('/:id', serviciosControlador.getServiciosPorId);

router.get('/', serviciosControlador.getServicios);

router.put('/:id', serviciosControlador.putServiciosPorId);

router.delete('/:id', serviciosControlador.deleteServiciosPorId);

export{router as serviciosRouter};