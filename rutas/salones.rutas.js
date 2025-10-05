import express from 'express';
import SalonesControlador from '../controlador/salones.controlador.js';

const router = express.Router();

const salonesControlador = new SalonesControlador();

router.post('/', salonesControlador.postSalones);

router.get('/:id', salonesControlador.getObtenerSalonPorId);

router.get('/', salonesControlador.getSalones);

router.put('/:id', salonesControlador.putSalonesPorId);

router.delete('/:id', salonesControlador.deleteSalonPorId);

export{router as salonesRouter};