import express from 'express';
import ServiciosControlador from '../../controlador/servicios.controlador.js';
import { autorizarUsuarios } from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const serviciosControlador = new ServiciosControlador();

router.post('/', autorizarUsuarios([1,2]), serviciosControlador.postServicios);

router.get('/:id', autorizarUsuarios([1,2,3]), serviciosControlador.getServiciosPorId);

router.get('/', autorizarUsuarios([1,2,3]), serviciosControlador.getServicios);

router.put('/:id', autorizarUsuarios([1,2]), serviciosControlador.putServiciosPorId);

router.delete('/:id', autorizarUsuarios([1,2]), serviciosControlador.deleteServiciosPorId);

export{router as serviciosRouter};